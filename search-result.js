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

let currentPage = 0; // 현재 페이지 번호
let isLastPage = false; // 마지막 페이지 인지 여부
const PAGE_SIZE = 10; // 고정된 페이지 사이즈
let currentQuery = ""; // 현재 검색 키워드
const postUl = document.querySelector(".search-post-ul");

// 검색 출력 페이지의 스크립트
const urlParams = new URLSearchParams(window.location.search);
const searchQuery = urlParams.get("q"); // URL 파라미터에서 검색어 추출

// getPagedList 함수를 사용하여 검색 결과 표시
getPagedList(0, searchQuery);

async function getPagedList(page, query) {
  try {
    const response = await fetch(
      `http://localhost:8080/musicolumn/paging/keyWord?page=${page}&size=${PAGE_SIZE}&keyWord=${query}`
    );
    const result = await response.json();
    console.log(result);

    postUl.innerHTML = "";

    result.content.forEach((post) => {
      // 각 게시물에 대한 목록 항목을 생성합니다.
      const postLi = createLi(
        post.genre,
        post.postNo,
        post.title,
        post.content,
        post.creatorName,
        post.singer,
        post.songName,
        post.image,
        post.audio,
        post.video,
        post.like,
        post.createdTime
      );

      // 목록에 항목을 추가합니다.
      postUl.appendChild(postLi);
    });
    // 페이지 정보 업데이트
    currentPage = result.number;
    isLastPage = result.last;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// // 검색 기능
// (() => {
//   const searchQuery = document.querySelector(".search-bar > input");
//   const searchBtn = document.querySelector(".search-bar > button");

//   searchBtn.addEventListener("click", (e) => {
//     e.preventDefault();
//     currentQuery = searchQuery.value;
//     getPagedList(0, currentQuery);
//     console.log(searchQuery.value);
//   });

//   searchQuery.addEventListener("keyup", (e) => {
//     e.preventDefault();
//     if (e.key.toLocaleLowerCase() === "enter") {
//       currentQuery = searchQuery.value;
//       getPagedList(0, currentQuery);
//     }
//   });
// })();

// // 검색 출력 페이지의 스크립트
// const urlParams = new URLSearchParams(window.location.search);
// const searchQuery = urlParams.get("q"); // URL 파라미터에서 검색어 추출

// // getPagedList 함수를 사용하여 검색 결과 표시
// getPagedList(0, searchQuery);
