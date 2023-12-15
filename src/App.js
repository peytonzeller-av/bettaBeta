import { useEffect, useState } from "react";
import { NextUIProvider } from "@nextui-org/system";
import { Select, SelectSection, SelectItem } from "@nextui-org/react";
import { createClient } from "@supabase/supabase-js";

// public, every one has access to see
const supabase = createClient("https://isarqhfqrjfwjmbwwzwe.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlzYXJxaGZxcmpmd2ptYnd3endlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDIwODQ1MzksImV4cCI6MjAxNzY2MDUzOX0.Z-fbNIwxQ_X4MbHz13B6eznXpLqfm2Q2vKRLhS5OtJc");

function App() {
  const [users, setUsers] = useState([]);

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
      <div class="h-screen">
        <div class="h-3/6 grid grid-cols-6 gap-4 place-content-center">
          <div class="col-start-2 col-span-4">  <h1 class="text-3xl font-bold underline text-slate-500 text-center">
           Locals
          </h1></div>
          <div class="col-start-2 col-span-4">
            <Select
              label=""
            >
              {users.map((user) => (
                <SelectItem key={user.user_id} value={user.full_name}>
                  {user.full_name}
                </SelectItem>
              ))}
            </Select>
          </div>
        </div>
      </div>
    </NextUIProvider >
  );
}

export default App;
