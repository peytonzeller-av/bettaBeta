import { useEffect, useState } from "react";
import { NextUIProvider } from "@nextui-org/system";
import { Select, SelectSection, SelectItem, ScrollShadow, Listbox, ListboxItem, Progress } from "@nextui-org/react";
import { createClient } from "@supabase/supabase-js";

// public, every one has access to see
const supabase = createClient("https://isarqhfqrjfwjmbwwzwe.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlzYXJxaGZxcmpmd2ptYnd3endlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDIwODQ1MzksImV4cCI6MjAxNzY2MDUzOX0.Z-fbNIwxQ_X4MbHz13B6eznXpLqfm2Q2vKRLhS5OtJc");

function App() {
  const [users, setUsers] = useState([]);
  const [climbs, setClimbs] = useState([{ name: 'bone cholla', id: 1 }, { name: 'highlander', id: 2 }, { name: 'take from tap', id: 3 }])
  const [areas, setAreas] = useState([{ name: 'la mesilla', id: 1 }])

  useEffect(() => {
    getUsers();
  }, []);

  async function getUsers() {
    const { data } = await supabase.from("Users").select(); // TODO
    console.log('Users: ', data)
    setUsers(data);
  }

  return (
    <NextUIProvider>
      <div class="h-screen w-screen">
        <div class="h-4/6 w-full flex flex-col justify-center gap-4 items-center">
          {<div class="max-w-lg">  <h1 class="text-3xl font-bold underline text-slate-500 text-center">
            Locals
          </h1></div>}
          <Select
            label=""
            color="primary"
            className="max-w-lg"
          >
            {users.map((user) => (
              <SelectItem key={user.user_id} value={user.full_name}>
                {user.full_name}
              </SelectItem>
            ))}
          </Select>
          <Select
            label=""
            color="primary"
            className="max-w-lg"
          >
            {areas.map((area) => (
              <SelectItem key={area.id} value={area.name}>
                {area.name}
              </SelectItem>
            ))}
          </Select>
          <Progress
            isStriped
            aria-label="Loading..."
            color="primary"
            value={60}
            className="max-w-lg"
          />
          <Listbox
            classNames={{
              list: "max-h-[300px] overflow-scroll",
            }}
            defaultSelectedKeys={["1"]}
            items={climbs}
            label="Assigned to"
            selectionMode="multiple"
            onSelectionChange={(() => console.log('e'))}
            variant="flat"
            className="row-auto border-solid border-2 border-cactus rounded-md max-w-lg"
          >
            {(item) => (
              <ListboxItem key={item.id} textValue={item.name}>
                <div className="flex gap-6 items-center">
                  <div className="flex flex-col">
                    <span className="text-small">{item.name}</span>
                    <span className="text-tiny text-default-400">{item.id}</span>
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
