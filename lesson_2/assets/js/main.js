/**
 * 전기차 현황 교육용 웹사이트 - 메인 기능 스크립트
 * 최종 업데이트: 2025-05-21
 */

// 에이스잇트에서는 업데이트 이벤트가 실행되면 입력된 함수를 실행합니다.
document.addEventListener('DOMContentLoaded', function() {
    console.log('전기차 현황 웹사이트 로드 완료');
    initNavigation();
    setupScrollEffects();
});

/**
 * 현재 페이지에 따른 네비게이션 활성화
 */
function initNavigation() {
    // 현재 페이지 URL 가져오기
    const currentPage = window.location.pathname.split('/').pop();
    
    // 모든 네비게이션 링크 가져오기
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    // 현재 페이지에 해당하는 링크에 active 클래스 추가
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href').split('/').pop();
        if (linkHref === currentPage || (currentPage === '' && linkHref === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

/**
 * 스크롤 이벤트에 따른 효과 설정
 */
function setupScrollEffects() {
    // 스크롤 이벤트 감지
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // 특정 요소에 대한 애니메이션 적용
        if (scrollTop > 100) {
            // 스크롤 시 헤더 스타일 변경 (추가 기능)
        }
    });
    
    // 페이지 로드 시 표시될 요소들에 대한 애니메이션 클래스 추가
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(element => {
        element.classList.add('visible');
    });
}

/**
 * 전기차 관련 데이터 가져오기
 * @param {string} dataType - 데이터 유형 (market, technology, environment, future)
 * @returns {Promise} - 데이터 가져오기 결과 Promise
 */
async function fetchEVData(dataType) {
    try {
        const response = await fetch(`/assets/data/${dataType}.json`);
        if (!response.ok) {
            throw new Error('Data fetch failed');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}
