/*import { readAllSnippet } from "@/app/api/snippet/service";
import { SnippetSearch } from "@/app/components/SnippetSearch/SnippetSearch";
export default async function MainPage() {
  const { data: snippets } = await readAllSnippet();
  return (
    <SnippetSearch snippets={snippets} placeholder={`Search your snippets`} />
  );
}
*/

/* import { FormEvent } from "react";

export default function IndexPage() {
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formValues = Object.fromEntries(formData.entries());
    alert(JSON.stringify(formValues));
    fetch("https://jsonplaceholder.typicode.com/todos", {
      method: "POST",
      body: JSON.stringify(formValues),
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
  };

  return (
    <form onSubmit={submit}>
      <input name="title" />
      <input name="body" />
      <button type="submit">Submit</button>
    </form>
  );
}
*/

/*
import { revalidatePath } from "next/cache";

export default async function IndexPage() {
  const response = await fetch("http://localhost:3090/posts");
  const posts = await response.json();

  const submit = async (formData: FormData) => {
    "use server";
    const formValues = Object.fromEntries(formData.entries());

    const body = JSON.stringify({
      title: formValues.title,
      author: "Robin",
    });

    console.log("body ", body);
    const resp = await fetch("http://localhost:3090/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    }).then((res) => res.json());

    revalidatePath("/");
  };

  return (
    <form action={submit}>
      <input name="title" />
      <button type="submit">Submit</button>
      <h1>Post list</h1>
      {posts.map((post) => (
        <div className="text-white flex" key={post.id}>
          {post.id} - {post.title}
        </div>
      ))}
    </form>
  );
}
*/

import { revalidatePath } from "next/cache";
import { FormEvent } from "react";

export default async function IndexPage() {
  const response = await fetch("http://localhost:3090/posts");
  const posts = await response.json();

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formValues = Object.fromEntries(formData.entries());

    const body = JSON.stringify({
      title: formValues.title,
      author: "Robin",
    });

    console.log("body ", body);
    const resp = await fetch("http://localhost:3090/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    }).then((res) => res.json());

    revalidatePath("/");
  };

  return (
    <form onSubmit={submit}>
      <input name="title" />
      <button type="submit">Submit</button>
      <h1>Post list</h1>
      {posts.map((post: any) => (
        <div className="text-white flex" key={post.id}>
          {post.id} - {post.title}
        </div>
      ))}
    </form>
  );
}
