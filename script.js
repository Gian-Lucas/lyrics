// const { default: Swal } = require("sweetalert2");

const [artist, title, button] = document.forms[0];

button.addEventListener("click", (e) => {
  e.preventDefault();

  if (validateFields()) {
    Swal.fire({
      title: "Procurando...",
      text: "Por favor, aguarde!",
      showConfirmButton: false,
      allowOutsideClick: false,
    });
    axios
      .get(`https://api.lyrics.ovh/v1/${artist.value}/${title.value}`)
      .then((response) => {
        Swal.close();
        console.log(response);

        const lyrics = response.data.lyrics.split(/[\n]/i);
        console.log(lyrics);
        let lyricsHTML = "<br />";
        // let index = lyrics.indexOf('');

        // while (index >= 0) {
        //   lyrics.splice(index, 1);
        //   index = lyrics.indexOf('');
        // }

        for (let i = 0; i < lyrics.length; i++) {
          if (lyrics[i].split()[0].split(" ")[0] !== "Paroles") {
            lyricsHTML += lyrics[i] + "<br />";
          }
        }
        console.log(lyricsHTML);

        document.querySelector(".lyrics").innerHTML = `
                    <h2>Letra de ${title.value} - ${artist.value}</h2>
                    <span>${lyricsHTML}</span>
                `;
      })
      .catch((error) => {
        Swal.fire(
          "Ops!",
          "parece que algo deu errado, tente novamente",
          "error"
        );
        console.log(error);
      });
  } else {
    Swal.fire("Ops!", "Por favor, preencha todos os campos.", "warning");
  }
});

function validateFields() {
  if (artist.value.trim() === "" || title.value.trim() === "") {
    return false;
  } else {
    return true;
  }
}
