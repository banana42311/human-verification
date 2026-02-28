// 페이지 로드 시 실행
window.onload = function() {
    startIntro();
};

// --- 화면 이동을 담당하는 만능 함수 (에러 방지용) ---
function goToNext(currentId, nextId) {
    const current = document.getElementById(currentId);
    const next = document.getElementById(nextId);
    
    // 두 화면이 모두 정상적으로 존재할 때만 이동
    if(current && next) {
        current.classList.remove('active');
        current.classList.add('hidden');
        next.classList.remove('hidden');
        next.classList.add('active');
    } else {
        console.error("에러: " + nextId + " 화면을 찾을 수 없습니다!");
    }
}

// -------------------- STEP 0: 로딩 --------------------
function startIntro() {
    const progressBar = document.querySelector('.progress');
    setTimeout(() => { if(progressBar) progressBar.style.width = '100%'; }, 100);
    // 3.5초 뒤 Step 1로 이동
    setTimeout(() => goToNext('step-0', 'step-1'), 3500);
}

// -------------------- 공통 기능 --------------------
function toggleSelect(element) {
    element.classList.toggle('selected');
}

// -------------------- STEP 1: 고양이 --------------------
function checkStep1() {
    const items = document.querySelectorAll('#step-1 .grid-item');
    let isSuccess = true;
    items.forEach(item => {
        const isTarget = item.getAttribute('data-is-cat') === "true"; 
        const isSelected = item.classList.contains('selected'); 
        if ((isTarget && !isSelected) || (!isTarget && isSelected)) isSuccess = false;
    });

    const msg = document.getElementById('result-message');
    if (isSuccess) {
        msg.style.color = "green"; msg.innerText = "Verification Passed. Redirecting...";
        setTimeout(() => goToNext('step-1', 'step-2'), 1500);
    } else {
        msg.style.color = "red"; msg.innerText = "Verification Failed. Please try again.";
        setTimeout(() => { items.forEach(i => i.classList.remove('selected')); msg.innerText = ""; }, 1500);
    }
}

// -------------------- STEP 2: 개 --------------------
function checkStep2() {
    const items = document.querySelectorAll('#step-2 .grid-item');
    let isSuccess = true;
    items.forEach(item => {
        const isTarget = item.getAttribute('data-is-dog') === "true"; 
        const isSelected = item.classList.contains('selected'); 
        if ((isTarget && !isSelected) || (!isTarget && isSelected)) isSuccess = false;
    });

    const msg = document.getElementById('result-message-2');
    if (isSuccess) {
        msg.style.color = "green"; msg.innerText = "Perceptual stability falls within benchmark range.";
        setTimeout(() => goToNext('step-2', 'step-3'), 1500);
    } else {
        msg.style.color = "red"; msg.innerText = "Verification Failed. Please try again.";
        setTimeout(() => { items.forEach(i => i.classList.remove('selected')); msg.innerText = ""; }, 1500);
    }
}

// -------------------- STEP 3: 생물학적 속성 --------------------
function checkStep3() {
    const msg = document.getElementById('result-message-3');
    msg.style.color = "black"; msg.innerText = "Analyzing biological data...";
    setTimeout(() => {
        msg.style.color = "#d93025"; msg.innerHTML = "Biological components do not constitute human identity.<br>Please proceed.";
        setTimeout(() => goToNext('step-3', 'step-4'), 3000); 
    }, 1500); 
}

// -------------------- STEP 4: 종 경계 평가 --------------------
function checkStep4(choice) {
    const msg = document.getElementById('result-message-4');
    document.querySelectorAll('#step-4 .choice-btn').forEach(btn => btn.disabled = true);
    msg.style.color = "black"; msg.innerText = "Processing judgment...";
    setTimeout(() => {
        msg.style.color = "#d93025"; msg.innerHTML = "Assessment Failed.<br>Response does not align with current human standards.";
        setTimeout(() => goToNext('step-4', 'step-5'), 2500);
    }, 1500);
}

// -------------------- STEP 5: 인지 일관성 --------------------
const step5Images = [
    "https://placehold.co/200x200/png?text=SUBJECT+1",
    "https://placehold.co/200x200/png?text=SUBJECT+2",
    "https://placehold.co/200x200/png?text=SUBJECT+3"
];
let currentStep5Index = 0; 

function handleStep5Choice() {
    const msg = document.getElementById('result-message-5');
    const imageEl = document.getElementById('step5-image');
    const counterEl = document.getElementById('step5-counter');
    document.querySelectorAll('.step5-btn').forEach(btn => btn.disabled = true);

    msg.style.color = "black"; msg.innerText = "Judgement pattern under analysis...";

    setTimeout(() => {
        currentStep5Index++; 
        if (currentStep5Index < 3) {
            imageEl.style.opacity = 0; 
            setTimeout(() => {
                imageEl.src = step5Images[currentStep5Index]; 
                counterEl.innerText = `Subject ${currentStep5Index + 1} / 3`; 
                imageEl.style.opacity = 1; 
                msg.innerText = ""; 
                document.querySelectorAll('.step5-btn').forEach(btn => btn.disabled = false); 
            }, 300);
        } else {
            msg.style.color = "#d93025"; msg.innerText = "Cognitive stability decreasing."; 
            setTimeout(() => goToNext('step-5', 'step-6'), 3000); 
        }
    }, 1500); 
}

// -------------------- STEP 6: 정서적 반응 --------------------
function checkStep6() {
    const msg = document.getElementById('result-message-6');
    const btn = document.querySelector('#step-6 .verify-btn');
    if(btn) btn.disabled = true;

    msg.style.color = "black"; msg.innerText = "Analyzing emotional parameters...";
    setTimeout(() => {
        msg.style.color = "#d93025"; msg.innerHTML = "Emotional response deviates from standard parameters.<br><br><span style='color: #ea4335;'>Additional notice: Empathy index irregular.</span>";
        setTimeout(() => goToNext('step-6', 'step-7'), 3500); 
    }, 2000); 
}

// -------------------- STEP 7: 권리 자격 심사 --------------------
function checkStep7() {
    const msg = document.getElementById('result-message-7');
    const btn = document.querySelector('#step-7 .verify-btn');
    if(btn) btn.disabled = true;

    msg.style.color = "black"; msg.innerText = "Evaluating rights allocation...";
    setTimeout(() => {
        msg.style.color = "#d93025"; msg.innerHTML = "Rights evaluation capacity insufficient.";
        setTimeout(() => {
            goToNext('step-7', 'step-8');
            // 화면이 넘어가고 나서 0.5초 뒤에 게이지가 깎이는 연출
            setTimeout(() => {
                const pb = document.getElementById('step8-progress');
                if(pb) pb.style.width = '73%';
            }, 500);
        }, 2500); 
    }, 1500); 
}

// -------------------- STEP 8: 동적 표준 조정 --------------------
function checkStep8() {
    const msg = document.getElementById('result-message-8');
    document.querySelectorAll('#step-8 .choice-btn').forEach(btn => btn.disabled = true);

    msg.style.color = "black"; msg.innerText = "Processing...";
    setTimeout(() => {
        msg.style.color = "#d93025"; msg.innerHTML = "Identity uncertainty detected.";
        setTimeout(() => goToNext('step-8', 'step-9'), 2500); 
    }, 1500);
}