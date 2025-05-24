/**
 * 전기차 현황 교육용 웹사이트 - 차트 및 데이터 시각화 스크립트
 * 최종 업데이트: 2025-05-21
 */

// Chart.js 라이브러리 사용을 위한 설정
let chartInstances = {};

/**
 * 차트 초기화 함수
 * @param {string} chartType - 차트 유형 (bar, line, pie, doughnut 등)
 * @param {string} canvasId - 차트를 그릴 캔버스 요소의 ID
 * @param {Object} data - 차트 데이터
 * @param {Object} options - 차트 옵션
 * @returns {Object} - 생성된 차트 인스턴스
 */
function initChart(chartType, canvasId, data, options = {}) {
    // 기존 차트가 있는 경우 파괴
    if (chartInstances[canvasId]) {
        chartInstances[canvasId].destroy();
    }
    
    const canvas = document.getElementById(canvasId);
    if (!canvas) {
        console.error(`Canvas element with ID '${canvasId}' not found`);
        return null;
    }
    
    const ctx = canvas.getContext('2d');
    
    // 기본 옵션 설정
    const defaultOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                mode: 'index',
                intersect: false
            }
        }
    };
    
    // 사용자 옵션과 기본 옵션 병합
    const chartOptions = { ...defaultOptions, ...options };
    
    // 차트 생성
    chartInstances[canvasId] = new Chart(ctx, {
        type: chartType,
        data: data,
        options: chartOptions
    });
    
    return chartInstances[canvasId];
}

/**
 * 전기차 시장 현황 차트 생성
 * @param {string} canvasId - 차트를 그릴 캔버스 요소의 ID
 * @param {Object} marketData - 시장 현황 데이터
 * @returns {Object} - 생성된 차트 인스턴스
 */
function createMarketChart(canvasId, marketData) {
    const years = marketData.years || [];
    const sales = marketData.sales || [];
    const forecast = marketData.forecast || [];
    
    const data = {
        labels: years,
        datasets: [
            {
                label: '전기차 판매량',
                data: sales,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 2,
                tension: 0.1
            },
            {
                label: '예측 판매량',
                data: forecast,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 2,
                borderDash: [5, 5],
                tension: 0.1
            }
        ]
    };
    
    const options = {
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: '판매량 (백만 대)'                
                }
            },
            x: {
                title: {
                    display: true,
                    text: '연도'
                }
            }
        }
    };
    
    return initChart('line', canvasId, data, options);
}

/**
 * 전기차 유형별 비율 파이 차트 생성
 * @param {string} canvasId - 차트를 그릴 캔버스 요소의 ID
 * @param {Object} typeData - 유형별 데이터
 * @returns {Object} - 생성된 차트 인스턴스
 */
function createTypeDistributionChart(canvasId, typeData) {
    const labels = typeData.types || [];
    const values = typeData.values || [];
    
    const data = {
        labels: labels,
        datasets: [{
            data: values,
            backgroundColor: [
                'rgba(54, 162, 235, 0.8)',
                'rgba(255, 99, 132, 0.8)',
                'rgba(255, 206, 86, 0.8)',
                'rgba(75, 192, 192, 0.8)',
                'rgba(153, 102, 255, 0.8)',
                'rgba(255, 159, 64, 0.8)'
            ],
            borderWidth: 1
        }]
    };
    
    const options = {
        plugins: {
            legend: {
                position: 'right',
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        let label = context.label || '';
                        if (label) {
                            label += ': ';
                        }
                        if (context.parsed !== undefined) {
                            label += context.parsed + '%';
                        }
                        return label;
                    }
                }
            }
        }
    };
    
    return initChart('pie', canvasId, data, options);
}

/**
 * 환경 영향 비교 차트 생성
 * @param {string} canvasId - 차트를 그릴 캔버스 요소의 ID
 * @param {Object} environmentData - 환경 영향 데이터
 * @returns {Object} - 생성된 차트 인스턴스
 */
function createEnvironmentalImpactChart(canvasId, environmentData) {
    const categories = environmentData.categories || [];
    const evEmissions = environmentData.evEmissions || [];
    const iceEmissions = environmentData.iceEmissions || [];
    
    const data = {
        labels: categories,
        datasets: [
            {
                label: '전기차',
                data: evEmissions,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2
            },
            {
                label: '내연기관차',
                data: iceEmissions,
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 2
            }
        ]
    };
    
    const options = {
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'CO2 배출량 (kg-CO2-eq)'
                }
            }
        }
    };
    
    return initChart('bar', canvasId, data, options);
}

/**
 * 데이터 가져오기 및 차트 초기화
 * @param {string} dataType - 데이터 유형 (market, technology, environment, future)
 * @returns {Promise} - 차트 초기화 Promise
 */
async function loadChartData(dataType) {
    try {
        // main.js의 fetchEVData 함수 사용
        const data = await fetchEVData(dataType);
        if (!data) {
            throw new Error(`Failed to load ${dataType} data`);
        }
        
        // 차트 생성 로직
        switch(dataType) {
            case 'market':
                createMarketChart('marketTrendsChart', data.sales);
                createTypeDistributionChart('marketShareChart', data.distribution);
                break;
            case 'environment':
                createEnvironmentalImpactChart('emissionsChart', data.emissions);
                break;
            // 추가 차트 유형은 여기에 추가
        }
        
        return true;
    } catch (error) {
        console.error('Error loading chart data:', error);
        return false;
    }
}

// 외부에서 사용할 함수 노출
window.evCharts = {
    initChart,
    createMarketChart,
    createTypeDistributionChart,
    createEnvironmentalImpactChart,
    loadChartData
};