document.addEventListener('DOMContentLoaded', function() {
    // 데이터 불러오기
    fetch('assets/data/future.json')
        .then(response => response.json())
        .then(data => {
            // 차트 및 그래프 초기화
            createMarketShareChart(data.marketProjections.globalMarketShare);
        })
        .catch(error => console.error('Error loading data:', error));
});

/**
 * 글로벌 시장 점유율 차트 생성
 * @param {Object} data 시장 점유율 데이터
 */
function createMarketShareChart(data) {
    const ctx = document.getElementById('marketShareChart');
    
    if (!ctx) return; // 차트 요소가 없으면 실행하지 않음
    
    // 데이터 준비
    const chartData = {
        labels: data.years,
        datasets: [
            {
                label: '전기차',
                data: data.evShare,
                backgroundColor: 'rgba(52, 152, 219, 0.7)',
                borderColor: 'rgba(52, 152, 219, 1)',
                borderWidth: 1,
                stack: 'Stack 0'
            },
            {
                label: '내연기관차',
                data: data.iceShare,
                backgroundColor: 'rgba(149, 165, 166, 0.7)',
                borderColor: 'rgba(149, 165, 166, 1)',
                borderWidth: 1,
                stack: 'Stack 0'
            }
        ]
    };
    
    // 차트 옵션
    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: false
            },
            tooltip: {
                mode: 'index',
                intersect: false,
                callbacks: {
                    label: function(context) {
                        var label = context.dataset.label || '';
                        if (label) {
                            label += ': ';
                        }
                        if (context.parsed.y !== null) {
                            label += context.parsed.y + '%';
                        }
                        return label;
                    }
                }
            },
            legend: {
                display: false
            }
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: '연도'
                }
            },
            y: {
                stacked: true,
                title: {
                    display: true,
                    text: '점유율(%)'
                },
                min: 0,
                max: 100
            }
        }
    };
    
    // 차트 생성
    new Chart(ctx, {
        type: 'bar',
        data: chartData,
        options: chartOptions
    });
}
