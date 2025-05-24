<?php
// navigation.php - 모든 페이지에서 공통으로 사용할 네비게이션 바

// 현재 페이지 경로를 가져와서 현재 메뉴 표시
$current_page = basename($_SERVER['PHP_SELF']);
?>

<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container">
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarMain" aria-controls="navbarMain" aria-expanded="false" aria-label="네비게이션 토글">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarMain">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                    <a class="nav-link <?php echo ($current_page == 'index.html' || $current_page == 'index.php') ? 'active' : ''; ?>" href="/index.html">홈</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link <?php echo ($current_page == 'technologies.html') ? 'active' : ''; ?>" href="/technologies.html">기술</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link <?php echo ($current_page == 'market.html') ? 'active' : ''; ?>" href="/market.html">시장 동향</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link <?php echo ($current_page == 'environment.html') ? 'active' : ''; ?>" href="/environment.html">환경 영향</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link <?php echo ($current_page == 'future.html') ? 'active' : ''; ?>" href="/future.html">미래 전망</a>
                </li>
            </ul>
        </div>
    </div>
</nav>