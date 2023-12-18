import { useEffect, useState } from "react";
import { NextUIProvider } from "@nextui-org/system";
import { Select, SelectSection, SelectItem, ScrollShadow, Listbox, ListboxItem, Progress, Button } from "@nextui-org/react";
import { createClient } from "@supabase/supabase-js";

// public, every one has access to see
const supabase = createClient("https://isarqhfqrjfwjmbwwzwe.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlzYXJxaGZxcmpmd2ptYnd3endlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDIwODQ1MzksImV4cCI6MjAxNzY2MDUzOX0.Z-fbNIwxQ_X4MbHz13B6eznXpLqfm2Q2vKRLhS5OtJc");

function App() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedZone, setSelectedZone] = useState('')
  const [climbs, setClimbs] = useState([])
  const [zones, setZones] = useState([])

  useEffect(() => {
    getUsers();
    getZones();
  }, []);

  useEffect(() => {
    if (selectedUser) {
      // call supabase and get all climbs for a given user
      getAllClimbsForSelectedUser();
    }
  }, [selectedUser])

  const getAllClimbsForSelectedUser = async () => {
    const response = await supabase.from('ClimbsUsers').select(`
id,
climb_id,
user_id,
sent,
Climbs (
climb_id,
climb_name,
grade
)
`).eq('user_id', selectedUser)
    if (Array.isArray(response?.data)) {
      const { data } = response;
      const allClimbs = data.reduce((acc, curr) => {
        if (curr?.Climbs) {
          acc.push({ ...curr?.Climbs, sent: curr?.sent })
        }
        return acc;
      }, [])
      setClimbs(allClimbs);
      return;
    }
    setClimbs([])
  }

  const getUsers = async () => {
    const { data } = await supabase.from("Users").select(); // TODO
    console.log('Users: ', data)
    setUsers(data);
  }

  const getZones = async () => {
    const { data } = await supabase.from("Zones").select(); // TODO
    console.log('Zones: ', data)
    setZones(data);
  }

  const setUser = (event) => {
    if (event?.target?.value) {
      // sets the user id
      setSelectedUser(event?.target?.value)
    }
  }

  const setZone = (event) => {
    if (event?.target?.value) {
      // sets the zone id
      setSelectedZone(event?.target?.value)
    }
  }

  const getProgressValue = () => {
    if (Array.isArray(climbs) && climbs?.length) {
      const sentClimbs = climbs.filter(climb => climb.sent);
      return sentClimbs?.length ? sentClimbs?.length / climbs?.length : 0;
    }
    return 0;
  }

  const getSentClimbs = () => {
    if (Array.isArray(climbs) && climbs?.length) {
      const sentClimbs = climbs.filter(climb => climb.sent);
      return sentClimbs?.length ? sentClimbs.map(climb => climb.climb_id?.toString()) : [];
    }
    return []
  }

  const showProgress = selectedUser && selectedZone;

  return (
    <NextUIProvider>
      <div class="h-screen w-screen">
        {/* TODO: Condionally render climbs length h-full vs h-4/6 */}
        <div class="h-full w-full flex flex-col justify-center gap-4 items-center">
          {<div class="max-w-lg">  <h1 class="text-cactus2 text-3xl font-bold underline text-slate-500 text-center">
            Locals
          </h1></div>}
          <Select
            label=""
            color="primary"
            className="max-w-lg"
            variant="bordered"
            selectedKeys={[selectedUser]}
            onChange={setUser}
          >
            {/* USERS */}
            {users.map((user) => (
              <SelectItem key={user.user_id} value={user.full_name}>
                {user.full_name}
              </SelectItem>
            ))}
          </Select>
          {/* ZONES */}
          <Select
            label=""
            color="primary"
            className="max-w-lg"
            variant="bordered"
            selectedKeys={[selectedZone]}
            onChange={setZone}
          >
            {zones.map((zone) => (
              <SelectItem key={zone.zone_id} value={zone.zone_name}>
                {zone.zone_name}
              </SelectItem>
            ))}
          </Select>
          <Progress
            label={showProgress ? 'Progress:' : ''}
            isStriped
            aria-label="Loading..."
            color="primary"
            value={getProgressValue()} // TODO: Remove hardcoded value
            className="max-w-lg"
            isIndeterminate={!showProgress}
            maxValue={1}
            showValueLabel={showProgress}
          />
          <Listbox
            classNames={{
              list: "overflow-scroll max-h-96",
            }}
            defaultSelectedKeys={["1"]}
            items={showProgress ? climbs : []}
            label="Assigned to"
            selectionMode="multiple"
            selectedKeys={getSentClimbs()}
            onSelectionChange={(() => console.log('e'))}
            variant="flat"
            className="row-auto border-solid border-2 border-cactus rounded-md max-w-lg"
            emptyContent="nada..." // TODO: Center this text
          >
            {(climb) => (
              <ListboxItem key={climb.climb_id} textValue={climb.climb_name}>
                <div className="flex gap-6 items-center">
                  <div className="flex flex-col">
                    <span className="text-small">{climb.climb_name}</span>
                    <span className="text-tiny text-default-400">{climb.grade}</span>
                  </div>
                </div>
              </ListboxItem>
            )}
          </Listbox>
        </div>
      </div>
    </NextUIProvider >
  );
}

export default App;
