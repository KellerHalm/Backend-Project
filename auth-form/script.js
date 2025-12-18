document.addEventListener('DOMContentLoaded', () => {
  const registerForm = document.getElementById('registerForm');
  const loginForm = document.getElementById('loginForm');
  const showLogin = document.getElementById('showLogin');
  const showRegister = document.getElementById('showRegister');
  const formTitle = document.getElementById('formTitle');
  const messageDiv = document.getElementById('message');

  // Переключение на форму входа
  showLogin.addEventListener('click', (e) => {
    e.preventDefault();
    registerForm.classList.remove('active');
    loginForm.classList.add('active');
    formTitle.textContent = 'Вход';
    messageDiv.style.display = 'none';
  });

  // Переключение на форму регистрации
  showRegister.addEventListener('click', (e) => {
    e.preventDefault();
    loginForm.classList.remove('active');
    registerForm.classList.add('active');
    formTitle.textContent = 'Регистрация';
    messageDiv.style.display = 'none';
  });

  // Отправка формы регистрации
  registerForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append('username', document.getElementById('regUsername').value.trim());
  formData.append('email', document.getElementById('regEmail').value.trim());
  formData.append('password', document.getElementById('regPassword').value);
  
  const avatarInput = document.getElementById('regAvatar');
  if (avatarInput.files[0]) {
    formData.append('avatar', avatarInput.files[0]);
  }

  try {
    const response = await fetch('http://localhost:5000/auth/registration', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    
    if (response.ok) {
      showMessage('Регистрация успешна!', true);
    } else {
      // Показываем первую ошибку валидации или общее сообщение
      let errorMsg = data.message || 'Ошибка регистрации';
      if (data.errors && data.errors.length > 0) {
        errorMsg = data.errors[0].msg || data.errors[0].param;
      }
      showMessage(errorMsg, false);
    }
  } catch (err) {
    console.error('Сетевая ошибка:', err);
    showMessage('Не удалось подключиться к серверу', false);
  }
});

  // Отправка формы входа
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

   const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;



    try {
      const response = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();
      showMessage(data.message || 'Вход выполнен успешно!', response.ok);

      if (response.ok) {
        // Здесь можно перенаправить пользователя, сохранить токен и т.д.
        console.log('Токен (если есть):', data.token);
      }
    } catch (err) {
      showMessage('Ошибка сети или сервер недоступен.', false);
    }
  });

  // Отображение сообщений
  function showMessage(text, isSuccess) {
    messageDiv.textContent = text;
    messageDiv.className = 'message ' + (isSuccess ? 'success' : 'error');
  }
});