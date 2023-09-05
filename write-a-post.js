const writeForm = document.querySelector(".write-form");
const inputs = writeForm.querySelectorAll("input");
const title = writeForm.querySelectorAll("input")[0];
const content = writeForm.querySelector("textarea");
const imageFile = writeForm.querySelectorAll("input")[1];
const audioFile = writeForm.querySelectorAll("input")[2];
const videoFile = writeForm.querySelectorAll("input")[3];
const songName = writeForm.querySelectorAll("input")[4];
const singer = writeForm.querySelectorAll("input")[5];
const genre = writeForm.querySelector("select");
const add = writeForm.querySelector("button");

// const resetData = () => {
//   for (const input of inputs) {
//     input.value = "";
//   }
//   console.log("resetData 호출됨");
// };

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

(() => {
  add.addEventListener("click", async (e) => {
    e.preventDefault();

    if (!audioFile.files[0]) {
      alert("오디오 파일을 넣으세요");
      return;
    }

    const audio = await readAudio(audioFile.files[0]);
    const image = imageFile.files[0]
      ? await readImage(imageFile.files[0])
      : null;
    const video = videoFile.files[0]
      ? await readVideo(videoFile.files[0])
      : null;

    const response = await fetch("http://localhost:8080/musicolumn", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getCookie("token")}`,
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

    writeForm.reset();
  });
})();
