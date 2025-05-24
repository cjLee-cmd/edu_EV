<?php
// API 관련 설정 및 함수들을 정의하는 파일

// 로그 기록 함수
function logMessage($message, $type = 'INFO') {
    $logFile = __DIR__ . '/../logs/app.log';
    $timestamp = date('Y-m-d H:i:s');
    $logEntry = "[$timestamp] [$type] $message" . PHP_EOL;
    
    // 로그 디렉토리가 없으면 생성
    if (!file_exists(dirname($logFile))) {
        mkdir(dirname($logFile), 0777, true);
    }
    
    file_put_contents($logFile, $logEntry, FILE_APPEND);
}

// OpenAI API 호출 함수
function callOpenAI($prompt, $apiKey) {
    try {
        // API 호출을 위한 설정
        $url = 'https://api.openai.com/v1/chat/completions';
        $headers = [
            'Content-Type: application/json',
            'Authorization: Bearer ' . $apiKey
        ];
        
        // API 요청 데이터
        $data = [
            'model' => 'gpt-4o', // 또는 다른 적절한 모델
            'messages' => [
                [
                    'role' => 'system',
                    'content' => '당신은 사용자의 메시지를 바탕으로 성격 분석을 제공하는 심리학 전문가입니다. ' .
                                 '빅 파이브 성격 특성(개방성, 성실성, 외향성, 친화성, 신경증)을 기준으로 분석하고, ' .
                                 '점수를 0-100 사이의 값으로 제공해주세요. JSON 형식으로 분석 결과를 반환해야 합니다.'
                ],
                [
                    'role' => 'user',
                    'content' => $prompt
                ]
            ],
            'max_tokens' => 1000,
            'temperature' => 0.7,
            'response_format' => [
                'type' => 'json_object'
            ]
        ];
        
        // cURL을 통한 API 요청
        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        
        // API 응답 처리
        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        
        if (curl_errno($ch)) {
            logMessage('API 요청 실패: ' . curl_error($ch), 'ERROR');
            curl_close($ch);
            return [
                'success' => false,
                'error' => '서버 연결 오류가 발생했습니다.'
            ];
        }
        
        curl_close($ch);
        
        // 응답 JSON 파싱
        $responseData = json_decode($response, true);
        
        // 응답 코드 확인
        if ($httpCode !== 200) {
            $errorMessage = isset($responseData['error']['message']) 
                            ? $responseData['error']['message'] 
                            : '알 수 없는 오류가 발생했습니다.';
            
            logMessage('API 오류: ' . $errorMessage . ', 코드: ' . $httpCode, 'ERROR');
            
            return [
                'success' => false,
                'error' => $errorMessage,
                'code' => $httpCode
            ];
        }
        
        // 성공 응답 처리
        $result = isset($responseData['choices'][0]['message']['content']) 
                ? $responseData['choices'][0]['message']['content'] 
                : null;
                
        if (!$result) {
            logMessage('API 응답에 예상된 데이터가 없습니다.', 'ERROR');
            return [
                'success' => false,
                'error' => 'API 응답 형식 오류'
            ];
        }
        
        logMessage('API 호출 성공', 'INFO');
        return [
            'success' => true,
            'result' => $result
        ];
        
    } catch (Exception $e) {
        logMessage('예외 발생: ' . $e->getMessage(), 'ERROR');
        return [
            'success' => false,
            'error' => '서버 오류가 발생했습니다.'
        ];
    }
}
