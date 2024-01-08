import { revalidatePath } from "next/cache";

export default async function IndexPage() {
  const response = await fetch("http://localhost:3090/posts", {
    cache: "no-cache",
  });
  const posts = await response.json();

  const submit = async (formData: FormData) => {
    "use server";

    const formValues = Object.fromEntries(formData.entries());
    const body = JSON.stringify({
      title: formValues.title,
      author: "Robin",
    });
    console.log(body);
    const resp = await fetch("http://localhost:3090/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    });
    const jsonResponse = await resp.json();
    console.log(jsonResponse);
    revalidatePath("/");
  };

  return (
    <form action={submit}>
      <input name="title" />
      <button type="submit">Submit</button>
      <h1>Posts</h1>
      {posts.map((post: any) => (
        <div className="text-white flex" key={post.id}>
          {post.id} - {post.title}
        </div>
      ))}
    </form>
  );
}
