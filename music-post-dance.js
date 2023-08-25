function createLi(
  genre,
  postNo,
  title,
  content,
  creatorName,
  singer,
  songName,
  image,
  audio,
  video,
  like,
  createdTime
) {
  // 생성자(연결된 서버 필드값)을 담을 매개변수를 받음
  const postLi = document.createElement("li");
  postLi.dataset.no = postNo;
  postLi.innerHTML = ` 
    <div>${title}</div></hr>
    <div>게시자: ${creatorName}</div>
    <div>좋아요: ${like}</div>
    <div>가수: ${singer}</div>
    <div>노래명: ${songName}</div>
    <div>${image ? `<img width="auto" height="30" src="${image}">` : ""}</div>
    <div><audio src=${audio} type="audio/mp3" controls></audio></div><br>
    <div>${
      video
        ? `<video src=${video} type="video/mp4" controls width="200" height="100"></video>`
        : ""
    }</div>
    <div>${content}</div><hr>
    <div><u>생성시간</u></br></br>
   ${new Date(createdTime).toLocaleString()}</div>`;
  return postLi;
}

const postUl = document.querySelector(".dance-post-ul"); // section을 위치시킬 기준점인 div를 지정

(async () => {
  // 비동기함수로 지정
  const data = await fetch("http://localhost:8080/musicolumn");
  // await를 사용하여 서버로부터 데이터를 기다리며 해당코드가 진행되는동안
  // 다른 코드들이 진행되며 서버로부터 데이터를 받아왔을 경우 data에 spring 데이터를 할당

  const result = await data.json(); // 받아온 데이터를 json형태로 변환하고 result에 할당
  console.log(result);

  for (let item of result) {
    if (item.genre === "dance") {
      // json데이터를 순회하여 요소들로 section을 만들 매개변수를 받음
      postUl.append(
        createLi(
          item.genre,
          item.postNo,
          item.title,
          item.content,
          item.creatorName,
          item.singer,
          item.songName,
          item.image,
          item.audio,
          item.video,
          item.like,
          item.createdTime
        )
      );
    }
  }
})(); // 즉시실행함수
