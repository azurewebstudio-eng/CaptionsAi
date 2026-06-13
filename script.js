async function generate() {

  const input =
    document.getElementById("input").value;

  document.getElementById("output").innerHTML =
    "Generating...";

  const response = await fetch("/api/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt:
        `Write a viral Instagram caption for ${input}`
    }),
  });

  const data = await response.json();

  document.getElementById("output").innerHTML =
    JSON.stringify(data);
}
