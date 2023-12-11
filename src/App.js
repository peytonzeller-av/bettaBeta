import { useEffect, useState } from "react";
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
    <ul>
      {users.map((user) => (
        <li key={user.full_name}>{user.full_name}</li>
      ))}
    </ul>
  );
}

export default App;
