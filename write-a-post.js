const postDiv = document.querySelector("#post-div");

(async () => {
  const form = document.querySelector("form");
  const title = form.querySelectorAll("input")[0];
  const content = form.querySelector("textarea");
  const imageFile = form.querySelectorAll("input")[1];
  const audioFile = form.querySelectorAll("input")[2];
  const videoFile = form.querySelectorAll("input")[3];
  const songName = form.querySelectorAll("input")[4];
  const singer = form.querySelectorAll("input")[5];
  const genre = form.querySelector("select");
  const add = form.querySelector("button");

  add.addEventListener("click", async (e) => {
    e.preventDefault();

    async function readImage(imageFile) {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(imageFile);
        reader.addEventListener("load", () => {
          resolve(reader.result);
        });
      });
    }

    async function readAudio(audioFile) {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(audioFile);
        reader.addEventListener("load", () => {
          resolve(reader.result);
        });
      });
    }

    async function readVideo(videoFile) {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(videoFile);
        reader.addEventListener("load", () => {
          resolve(reader.result);
        });
      });
    }

    async function sendData() {
      const audio = audioFile.files[0]
        ? await readAudio(audioFile.files[0])
        : null;
      const image = imageFile.files[0]
        ? await readImage(imageFile.files[0])
        : null;
      const video = videoFile.files[0]
        ? await readVideo(videoFile.files[0])
        : null;

      if (!audio) {
        alert("오디오 파일을 넣으세요");
        return;
      }

      const response = await fetch("http://localhost:8080/musicolumn", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          title: title.value,
          singer: singer.value,
          songName: songName.value,
          image: image,
          audio: audio,
          video: video,
          content: content.value,
          genre: genre.value,
        }),
      });

      const result = await response.json();
      console.log(result);

      form.reset();
    }

    sendData();
  });
})();
