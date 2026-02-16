// 페이지 로드 시 실행
window.onload = function() {
    startIntro();
};

// -------------------- STEP 0: 로딩 화면 --------------------
function startIntro() {
    const progressBar = document.querySelector('.progress');
    
    // 0.1초 뒤에 로딩바 시작
    setTimeout(() => {
        if(progressBar) progressBar.style.width = '100%';
    }, 100);

    // 3.5초 뒤에 Step 1 화면으로 전환
    setTimeout(() => {
        const step0 = document.getElementById('step-0');
        const step1 = document.getElementById('step-1');

        if(step0 && step1) {
            step0.classList.remove('active');
            step0.classList.add('hidden');
            
            step1.classList.remove('hidden');
            step1.classList.add('active');
        }
    }, 3500);
}

// -------------------- 공통 기능: 선택 토글 --------------------
function toggleSelect(element) {
    element.classList.toggle('selected');
}

// -------------------- STEP 1: 고양이 고르기 --------------------
function checkStep1() {
    const items = document.querySelectorAll('#step-1 .grid-item');
    let isSuccess = true;

    items.forEach(item => {
        const isCat = item.getAttribute('data-is-cat') === "true"; 
        const isSelected = item.classList.contains('selected'); 

        // 고양이인데 선택 안 했거나, 고양이가 아닌데 선택했으면 실패
        if ((isCat && !isSelected) || (!isCat && isSelected)) {
            isSuccess = false;
        }
    });

    const messageBox = document.getElementById('result-message');

    if (isSuccess) {
        // 성공 시 메시지
        messageBox.style.color = "green";
        messageBox.innerText = "Verification Passed. Redirecting...";
        
        // 1.5초 뒤에 Step 3로 이동
        setTimeout(() => {
            goToStep3();
        }, 1500);
    } else {
        // 실패 시 메시지
        messageBox.style.color = "red";
        messageBox.innerText = "Verification Failed. Please try again.";
        
        // 1.5초 뒤에 선택 초기화
        setTimeout(() => {
            items.forEach(item => item.classList.remove('selected'));
            messageBox.innerText = "";
        }, 1500);
    }
}

// -------------------- STEP 3로 이동 --------------------
function goToStep3() {
    const step1 = document.getElementById('step-1');
    const step3 = document.getElementById('step-3');

    if(step1 && step3) {
        step1.classList.remove('active');
        step1.classList.add('hidden');
        
        step3.classList.remove('hidden');
        step3.classList.add('active');
    }
}

// -------------------- STEP 3: 신체 부위 고르기 --------------------
// 기존 checkStep3 함수를 찾아서 아래 내용으로 바꿔치기(덮어쓰기) 하세요.
function checkStep3() {
    const messageBox = document.getElementById('result-message-3');
    
    // 분석 중...
    messageBox.style.color = "black";
    messageBox.innerText = "Analyzing biological data...";

    setTimeout(() => {
        // 무조건 실패 메시지 출력
        messageBox.style.color = "#d93025"; 
        messageBox.innerHTML = "Biological components do not constitute human identity.<br>Please proceed.";
        
        // ▼▼▼ 이 부분이 추가된 핵심입니다! (3초 뒤에 Step 4로 이동) ▼▼▼
        setTimeout(() => {
            goToStep4(); 
        }, 3000); 
        // ▲▲▲ 추가된 부분 끝 ▲▲▲

    }, 1500); 
}

// ▼▼▼ 파일 맨 끝에 붙여넣으세요 ▼▼▼

// STEP 3 -> STEP 4 화면 전환 함수
function goToStep4() {
    // Step 3 숨기기
    const step3 = document.getElementById('step-3');
    const step4 = document.getElementById('step-4');

    if(step3 && step4) {
        step3.classList.remove('active');
        step3.classList.add('hidden');
        
        step4.classList.remove('hidden');
        step4.classList.add('active');
    }
}

// STEP 4: YES / NO 평가 함수
function checkStep4(choice) {
    const messageBox = document.getElementById('result-message-4');
    
    // 버튼을 또 누르지 못하게 비활성화
    const btns = document.querySelectorAll('.choice-btn');
    btns.forEach(btn => btn.disabled = true);

    messageBox.style.color = "black";
    messageBox.innerText = "Processing judgment...";

    setTimeout(() => {
        messageBox.style.color = "#d93025"; // 빨간색 경고
        // 사용자가 무엇을 골랐든(choice) 실패 메시지 출력
        messageBox.innerHTML = "Assessment Failed.<br>Response does not align with current human standards.";
        
        // 나중에 Step 5로 넘어가는 코드를 여기에 추가할 예정입니다.
        // setTimeout(() => goToStep5(), 2500);
    }, 1500);
}