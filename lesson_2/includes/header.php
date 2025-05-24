<?php
// header.php - 모든 페이지에서 공통으로 사용할 헤더 파일
?>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>전기차 현황 - 교육용 웹사이트</title>
    <meta name="description" content="전기차의 현황, 기술, 시장, 환경 영향, 미래 전망에 대한 교육 자료를 제공하는 웹사이트입니다.">
    <link rel="stylesheet" href="/assets/css/style.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Chart.js 라이브러리 추가 -->
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>
<body>
    <header class="bg-success bg-gradient text-white py-3">
        <div class="container">
            <div class="row align-items-center">
                <div class="col-md-6">
                    <h1 class="site-title"><a href="/main.html" class="text-white text-decoration-none">전기차 현황</a></h1>
                    <p class="site-description mb-0">지속 가능한 미래를 위한 교육 플랫폼</p>
                </div>
                <div class="col-md-6 d-none d-md-block">
                    <img src="/assets/images/header-illustration.svg" alt="전기차 일러스트레이션" class="img-fluid header-image">
                </div>
            </div>
        </div>
    </header>