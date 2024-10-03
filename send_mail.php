<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Получаем данные формы
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $message = htmlspecialchars($_POST['message']);

    // Указываем, на какую почту отправлять сообщение
    $to = 'your-email@example.com'; // Замените на вашу почту

    // Тема письма
    $subject = "Нове повідомлення з контактної форми";

    // Сообщение письма
    $email_message = "Ім'я: $name\n";
    $email_message .= "Email: $email\n";
    $email_message .= "Повідомлення: \n$message";

    // Заголовки письма
    $headers = "From: $email" . "\r\n" .
               "Reply-To: $email" . "\r\n" .
               "X-Mailer: PHP/" . phpversion();

    // Отправляем письмо
    if (mail($to, $subject, $email_message, $headers)) {
        // Сообщение об успешной отправке
        echo json_encode(['status' => 'success', 'message' => 'Повідомлення відправлено успішно!']);
    } else {
        // Сообщение о неудаче
        echo json_encode(['status' => 'error', 'message' => 'Помилка під час відправлення']);
    }
} else {
    // Возвращаем ошибку, если запрос не POST
    echo json_encode(['status' => 'error', 'message' => 'Невірний метод запиту']);
}
?>
