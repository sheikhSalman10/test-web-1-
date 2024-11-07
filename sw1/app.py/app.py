from flask import Flask, request, redirect, render_template, session
from flask_mysqldb import MySQL
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
app.secret_key = 'your_secret_key'  # Replace with your own secret key

# Configure MySQL
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'your_username'
app.config['MYSQL_PASSWORD'] = 'your_password'
app.config['MYSQL_DB'] = 'admission_db'

mysql = MySQL(app)
login_manager = LoginManager(app)
login_manager.login_view = 'login'

class User(UserMixin):
    pass

@login_manager.user_loader
def load_user(user_id):
    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM users WHERE id = %s", (user_id,))
    user_data = cur.fetchone()
    if user_data:
        user = User()
        user.id = user_data[0]
        return user
    return None

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        cur = mysql.connection.cursor()
        cur.execute("SELECT * FROM users WHERE username = %s", (username,))
        user_data = cur.fetchone()
        if user_data and check_password_hash(user_data[1], password):
            user = User()
            user.id = user_data[0]
            login_user(user)
            return redirect('/admin')
        return "Invalid credentials"
    return render_template('login.html')

@app.route('/admin')
@login_required
def admin():
    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM applications")
    applications = cur.fetchall()
    return render_template('admin.html', applications=applications)

@app.route('/submit', methods=['POST'])
def submit_form():
    student_name = request.form['studentName']
    parent_email = request.form['parentEmail']
    student_class = request.form['studentClass']
    dob = request.form['dob']
    
    cur = mysql.connection.cursor()
    cur.execute("INSERT INTO applications(student_name, parent_email, student_class, dob) VALUES (%s, %s, %s, %s)", 
                (student_name, parent_email, student_class, dob))
    mysql.connection.commit()
    cur.close()
    
    return "Application submitted successfully!"

if __name__ == '__main__':
    app.run(debug=True)
