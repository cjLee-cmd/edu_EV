/**
 * 전기차 현황 교육용 웹사이트 - 네비게이션 관련 스크립트
 * 최종 업데이트: 2025-05-21
 */

/**
 * 네비게이션 및 헤더 요소 초기화
 */
function initNavigationElements() {
    // 현재 페이지 아이템 활성화
    setActiveNavigationItem();
    
    // 모바일 화면용 토글 버튼 이벤트 연결
    setupMobileNavToggle();
    
    // 스크롤 이벤트에 따른 헤더 스타일 변경
    setupScrollHeaderEffect();
    
    // 드롭다운 메뉴 처리
    setupDropdownMenus();
    
    // 스몰드 스크롤 오클릭 이벤트 등록
    setupSmoothScrolling();
}

/**
 * 현재 페이지에 해당하는 네비게이션 아이템 활성화
 */
function setActiveNavigationItem() {
    // 현재 페이지 URL 가져오기
    const currentPath = window.location.pathname;
    const currentPage = currentPath.split('/').pop() || 'main.html';
    
    // 모든 네비게이션 링크 가져오기
    const navLinks = document.querySelectorAll('.nav-link');
    
    // 현재 페이지에 해당하는 네비게이션 아이템에 active 클래스 추가
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        const linkPage = href.split('/').pop();
        
        // 현재 페이지와 링크가 일치하는지 확인
        if (linkPage === currentPage) {
            link.classList.add('active');
            
            // 링크가 드롭다운 메뉴 내부에 있는 경우, 해당 드롭다운도 활성화
            const parentDropdown = link.closest('.dropdown-menu');
            if (parentDropdown) {
                const dropdownToggle = parentDropdown.previousElementSibling;
                if (dropdownToggle && dropdownToggle.classList.contains('dropdown-toggle')) {
                    dropdownToggle.classList.add('active');
                }
            }
        } else {
            link.classList.remove('active');
        }
    });


/**
 * 모바일 화면용 토글 버튼 이벤트 연결
 */
function setupMobileNavToggle() {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (navbarToggler && navbarCollapse) {
        navbarToggler.addEventListener('click', function() {
            // 콜랩스 표시 상태 토글
            navbarCollapse.classList.toggle('show');
            
            // 토글러 아이콘 상태 변경
            const isExpanded = navbarCollapse.classList.contains('show');
            navbarToggler.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
            
            // 메뉴가 통췉되어 있을 때는 바디에 스크롤 블록
            if (isExpanded) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
        
        // 네비게이션 링크 클릭 시 모바일 메뉴 닫기
        const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                // 모바일 화면에서만 작동
                if (window.innerWidth < 992) {
                    navbarCollapse.classList.remove('show');
                    navbarToggler.setAttribute('aria-expanded', 'false');
                    document.body.style.overflow = '';
                }
            });
        });
    }
}

/**
 * 스크롤 이벤트에 따른 헤더 스타일 변경 설정
 */
function setupScrollHeaderEffect() {
    const header = document.querySelector('header');
    
    if (header) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.scrollY;
            
            // 스크롤 위치에 따라 헤더 스타일 변경
            if (scrollPosition > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }


/**
 * 드롭다운 메뉴 처리 설정
 */
function setupDropdownMenus() {
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            const parentLi = this.closest('li.dropdown');
            
            // 활성화 상태 토글
            parentLi.classList.toggle('show');
            const dropdown = this.nextElementSibling;
            if (dropdown) {
                dropdown.classList.toggle('show');
            }
        });
    });
    
    // 드롭다운 메뉴 외부 클릭 시 닫기
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.dropdown')) {
            document.querySelectorAll('.dropdown-menu.show').forEach(dropdown => {
                dropdown.classList.remove('show');
                dropdown.closest('li.dropdown').classList.remove('show');
            });
        }
    });
}

/**
 * 스몰드 스크롤 처리 설정
 */
function setupSmoothScrolling() {
    // 스몰드 스크롤을 위한 링크 선택 (#으로 시작하는 해시 링크)
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
    
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 해시에서 타겟 요소 ID 추출
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // 스몰드 스크롤 적용
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // 헤더 높이 고려
                    behavior: 'smooth'
                });
                
                // URL 해시 업데이트 (가능한 경우)
                if (history.pushState) {
                    history.pushState(null, null, targetId);
                } else {
                    location.hash = targetId;
                }
                
                // 접근성을 위해 포커스 설정
                targetElement.setAttribute('tabindex', '-1');
                targetElement.focus();
            }
        });
    });
}

// 외부에서 사용할 함수 노출
window.evNavigation = {
    initNavigationElements,
    setActiveNavigationItem,
    setupMobileNavToggle,
    setupScrollHeaderEffect,
    setupDropdownMenus,
    setupSmoothScrolling
};