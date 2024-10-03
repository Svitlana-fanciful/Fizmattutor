<?php
// Укажите ваш адрес электронной почты
$recipientEmail = "fizmattutors@gmail.com";

// Проверка, что запрос пришел методом POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Получение и валидация данных
    $name = isset($_POST['name']) ? htmlspecialchars(trim($_POST['name'])) : '';
    $phone = isset($_POST['phone']) ? htmlspecialchars(trim($_POST['phone'])) : '';
    $email = isset($_POST['email']) ? htmlspecialchars(trim($_POST['email'])) : '';
    $message = isset($_POST['message']) ? htmlspecialchars(trim($_POST['message'])) : '';

    // Проверка обязательных полей для модального окна (Имя, Телефон, Сообщение)
    if (!empty($name) && !empty($phone) && !empty($message)) {
        $subject = "Новая заявка с сайта (Модальное окно)";
        $emailMessage = "Ім'я: $name\n";
        $emailMessage .= "Телефон: $phone\n";
        $emailMessage .= "Повідомлення:\n$message\n";
    }
    // Проверка обязательных полей для формы на сайте (Имя, Email, Сообщение)
    elseif (!empty($name) && !empty($email) && !empty($message)) {
        $subject = "Новая заявка с сайта (Форма на сайте)";
        $emailMessage = "Ім'я: $name\n";
        $emailMessage .= "Email: $email\n";
        $emailMessage .= "Повідомлення:\n$message\n";
    } else {
        // Если обязательные поля не заполнены
        echo 'error';
        exit;
    }

    // Формирование заголовков письма
    $headers = "From: no-reply@yourdomain.com\r\n";
    $headers .= "Reply-To: no-reply@yourdomain.com\r\n";
    $headers .= "Content-Type: text/plain; charset=utf-8\r\n";

    // Отправка письма
    if (mail($recipientEmail, $subject, $emailMessage, $headers)) {
        echo 'success';
    } else {
        echo 'error';
    }
} else {
    // Если запрос не методом POST
    echo 'error';
}
?>