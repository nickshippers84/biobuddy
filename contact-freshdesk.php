<?php
// Contact form handler for BioBuddy using Freshdesk API
// Creates a ticket in Freshdesk instead of sending email

// Set response headers
header('Content-Type: application/json; charset=UTF-8');

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

// Get and sanitize form data
$name = isset($_POST['name']) ? trim(htmlspecialchars($_POST['name'])) : '';
$email = isset($_POST['email']) ? trim($_POST['email']) : '';
$reason = isset($_POST['reason']) ? trim(htmlspecialchars($_POST['reason'])) : '';
$message = isset($_POST['message']) ? trim(htmlspecialchars($_POST['message'])) : '';

// Validation
$errors = [];

if (empty($name)) {
    $errors[] = 'Name is required';
}

if (empty($email)) {
    $errors[] = 'Email is required';
} elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'Invalid email address';
}

if (empty($reason)) {
    $errors[] = 'Reason for contact is required';
}

if (empty($message)) {
    $errors[] = 'Message is required';
}

// If there are validation errors, return them
if (!empty($errors)) {
    http_response_code(200); // Return 200 to avoid 409
    echo json_encode(['success' => false, 'message' => implode(', ', $errors)]);
    exit;
}

// Freshdesk API Configuration
// TODO: Replace these with your actual Freshdesk credentials
$freshdesk_domain = 'YOUR_DOMAIN.freshdesk.com'; // e.g., 'biobuddy.freshdesk.com'
$freshdesk_api_key = 'YOUR_API_KEY'; // Get from Freshdesk Profile Settings > API

// Map reason to Freshdesk priority/status
$priority_map = [
    'technical' => 2, // High priority for technical support
    'pricing' => 1,    // Medium priority
    'demo' => 1,       // Medium priority
    'general' => 1,    // Medium priority
    'partnership' => 1, // Medium priority
    'media' => 1,      // Medium priority
    'other' => 1       // Medium priority
];

$priority = isset($priority_map[$reason]) ? $priority_map[$reason] : 1;

// Prepare ticket data
$ticket_data = [
    'email' => $email,
    'subject' => 'Contact Form: ' . $reason,
    'description' => "Name: " . $name . "\n\n" . 
                     "Email: " . $email . "\n\n" . 
                     "Reason: " . $reason . "\n\n" . 
                     "Message:\n" . $message,
    'priority' => $priority,
    'status' => 2, // Open status
    'source' => 2, // Portal
    'tags' => ['contact-form', 'website', $reason]
];

// Create ticket via Freshdesk API
$url = 'https://' . $freshdesk_domain . '/api/v2/tickets';
$auth = base64_encode($freshdesk_api_key . ':X'); // API key format for Freshdesk

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($ticket_data));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'Authorization: Basic ' . $auth
]);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);

$response = curl_exec($ch);
$http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curl_error = curl_error($ch);
curl_close($ch);

// Handle response
if ($http_code === 201) {
    // Ticket created successfully
    $ticket = json_decode($response, true);
    error_log("Freshdesk ticket created: #" . $ticket['id'] . " from $email");
    
    http_response_code(200);
    echo json_encode([
        'success' => true,
        'message' => 'Thank you for your message! We\'ll get back to you soon. (Ticket #' . $ticket['id'] . ')'
    ]);
} else {
    // Error creating ticket
    $error_data = json_decode($response, true);
    $error_msg = isset($error_data['errors']) ? json_encode($error_data['errors']) : $response;
    
    error_log("Freshdesk API error (HTTP $http_code): $error_msg");
    if ($curl_error) {
        error_log("cURL error: $curl_error");
    }
    
    // Still return 200 to avoid 409 conflicts
    http_response_code(200);
    echo json_encode([
        'success' => false,
        'message' => 'Sorry, there was an error submitting your request. Please try again or email us directly at support@biobuddy.com'
    ]);
}
?>


