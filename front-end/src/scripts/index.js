document.addEventListener("DOMContentLoaded", () => {
  const signUpForm = document.getElementById("signUpForm");

  signUpForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("inputEmailSignUp").value;
    const password = document.getElementById("inputPasswordSignUp").value;

    if (!email || !password) {
      alert("Email dan password harus diisi");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "User Default", //[MAU TAMBAH INPUTAN NAME, MASIH DEFAULT]
          email,
          password,
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        alert("Gagal registrasi: " + result.message);
        return;
      }

      alert("Registrasi berhasil!");
    } catch (err) {
      console.error("Error:", err);
      alert("Terjadi kesalahan");
    }
  });
});
