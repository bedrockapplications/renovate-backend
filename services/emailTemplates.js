const email_templates = {

    "forgot_password": {
        subject: "Bedrock - Forgot Password",
        text: (template_data) => `Hi,\n\nYour password is ${template_data.temp_password}`,
        html: (template_data) => `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            body {
                font-family: 'Arial', sans-serif;
                background-color: #f4f4f4;
                color: #333;
                margin: 0;
                padding: 0;
            }
    
            .container {
                max-width: 600px;
                margin: 20px auto;
                background-color: #fff;
                border-radius: 10px;
                overflow: hidden;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
    
            .header {
                background-color: #3498db;
                color: #fff;
                text-align: center;
                padding: 20px;
            }
    
            .content {
                padding: 20px;
            }
    
            p {
                margin-bottom: 15px;
            }
    
            .button {
                display: inline-block;
                padding: 10px 20px;
                background-color: #3498db;
                color: #fff;
                text-decoration: none;
                border-radius: 5px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h2>Hi there!</h2>
            </div>
            <div class="content">
                <p>Your password is <strong>${template_data.temp_password}</strong></p>
                <p>Click the button below to login:</p>
                <a href="https://your-login-url.com" class="button">Login</a>
            </div>
        </div>
    </body>
    </html>
    `
    },
    //send mails to all contractors with service provided
    "publish_project": {
        subject: "Bedrock - New Project",
        text: (template_data) => `Hi,\n\nA new project has been published. Please check your dashboard.`,
        html: (template_data) => `<!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            body {
                font-family: 'Arial', sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
            }
    
            .container {
                max-width: 600px;
                margin: 20px auto;
                background-color: #ffffff;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
    
            h1 {
                color: #333;
            }
    
            p {
                color: #555;
            }
    
            a {
                color: #007BFF;
                text-decoration: none;
            }
    
            .btn {
                display: inline-block;
                padding: 10px 20px;
                margin-top: 15px;
                background-color: #007BFF;
                color: #fff;
                text-decoration: none;
                border-radius: 5px;
            }
        </style>
    </head>
    
    <body>
        <div class="container">
            <h1>Bedrock - New Project</h1>
            <p>Hi,</p>
            <p>A new project has been published. Please check your dashboard for more details.</p>
            <a href="#" class="btn">Visit Dashboard</a>
        </div>
    </body>
    
    </html>`


    }
}

module.exports = {
    email_templates,

}
