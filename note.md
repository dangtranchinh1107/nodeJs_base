### SETUP MÔI TRƯỜNG
- npm init : bắt đầu qyas trình tạo back-end
- express
- jsonwebtoken : quản lý logIn logOut, xác thực người dùng
- mongoose : nói ch từ server với database
- dotenv : lấy biến môi trường 
- cors : nói chuyện giữa fe-be (
    //Middleware for handling CORS POLICY

    //Option 1: Allow Origins with Default of cors
    app.use(cors());

    //Option 2: Allow Custom Origins
    app.use(
        cors({
            origin: 'http://localhost:3000',
            methods: ['GET', 'POST', 'PUT', 'DELETE'],
            allowedHeaders: ['Content-Type'],
        }))
) 
- nodemon : tự khởi động lại server khi thấy có sự thay đổi từ code
- babel-cli babel-preset-env babel-preset-stage-0
- tạo file .babelrc : để viết ES6 
{
    "presets":[
        "env",
        "stage-0"
    ]
}
- thêm vào cặp thẻ script trong packet.json 
"dev": "nodemon ./app.js --exec babel-node -e js"

### Kết nối mongo và tạo Router

IEJo1ysl54QAe3ka
mongodb+srv://chinhdtph29556:<password>@cluster0.twujcl5.mongodb.net/?retryWrites=true&w=majority

### Validation
- npm i joi
- npm i bcryptjs : mã hóa mật khẩu

### Phân trang

npm i mongoose-paginate-v2

# hello xin chào các bạn nha

xin chào các bạn

# github 
github