const data = {  //상태를 저장하기 위한 간단한 객체
    status: "off",
    statusTo: "on"
};

function toggle(d, s, t){   //상태 변경 함수
    if(d.status === "off"){
        d.status = "on"
        d.statusTo = "off"
        s.innerText = d.status;
        t.innerText = d.statusTo;
    }else if(d.status === "on"){
        d.status = "off"
        d.statusTo = "on"
        s.innerText = d.status;
        t.innerText = d.statusTo;
    }
}

const status = document.getElementById('status');
const statusTo = document.getElementById('status-to');

status.innerText = data.status;
// 팝업의 상태 텍스트 설정

statusTo.innerText = data.statusTo;
// 팝업의 버튼 텍스트 설정

chrome.tabs.executeScript({ //비디오 플레이어 element 지정
    code: `
    const player = document.getElementsByClassName("fco-clip-content__viewer")[0];
    `
})

statusTo.onclick = ()=>{
    //버튼 클릭시 설정 상태 변경
    if(data.status === "off"){  //현재 상태가 꺼진 경우
        chrome.tabs.executeScript({ 
            //화면 크기 변경을 위한 코드 실행
            code: `
            player.style.display = "flex";
            player.style.height = "500px";
            `
        })
    }else if(data.status === "on"){ //현재 상태가 켜진 경우
        chrome.tabs.executeScript({
            //원상태로 변경
            code: `
            player.removeAttribute("style");
            `
        })
    }

    
    toggle(data, status, statusTo)  
    //상태 변경을 데이터와 팝업에 반영
}

