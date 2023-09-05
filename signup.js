const id = document.querySelectorAll("input")[0];
const password = document.querySelectorAll("input")[1];
const checkedPassword = document.querySelectorAll("input")[2];
const nickName = document.querySelectorAll("input")[3];
const birthdate = document.querySelectorAll("input")[4];
const email = document.querySelectorAll("input")[5];
const checkedEmail = document.querySelectorAll("input")[6];
const inputs = document.querySelectorAll("input");
// const inputAll = document.querySelectorAll("input");

const nullCheck = [
  id,
  password,
  checkedPassword,
  nickName,
  birthdate,
  email,
  checkedEmail,
];

const join = document.querySelector("button");

const resetInput = () => {
  for (const input of inputs) {
    input.value = "";
  }
};

(() => {
  join.addEventListener("click", async (e) => {
    e.preventDefault();
    for (let i = 0; i < nullCheck.length; i++) {
      const inputValue = nullCheck[i].value;
      if (!inputValue || inputValue.trim() == "") {
        alert(`${nullCheck[i].getAttribute("name")}창이 비어있습니다.`);
        return;
      }
    }
    for (const item of nullCheck) {
      if (password.value !== checkedPassword.value) {
        console.log(password.value);
        console.log(checkedPassword.value);
        alert("Password가 일치하지 않습니다.");
        return;
      } else if (email.value !== checkedEmail.value) {
        alert("Email이 일치하지 않습니다.");
        return;
      }
    }
    const response = await fetch("http://localhost:8080/auth/signup", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        id: id.value,
        password: password.value,
        nickName: nickName.value,
        birthdate: birthdate.value,
        email: email.value,
      }),
    });
    if (response.status === 201) {
      alert("회원가입에 정상적으로 되었습니다.");
      window.location.href = "http://localhost:5500/login.html";
    } else {
      alert("회원가입에 실패했습니다.");
    }
    // resetInput();
  });
})();
