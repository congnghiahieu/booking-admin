# Booking hotel Admin

## Intro

Trang Admin sẽ được tạo cơ bản (không CSS) trước để thuận tiện cho việc quản lí user, hotel (thêm, sửa, xoá thông tin vào DB dễ dàng hơn)

Sau khi hoàn thiện Frontend user nếu còn thời gian sẽ hoàn thiện trang Admin

## Router

Router cho admin (Admin dashboard). Router cho admin luôn bắt đầu bằng `http://localhost:3000/admin/...`:

- `/login`: chức năng đăng nhập
- `/home`: Hiện thị nút chuyển trang quản lý user, hotel list
- `/users`: Hiện thị list tất cả user, thêm, xoá user
- `/hotels`: Hiện thi list tất cả hotel, thêm, xoá hotel
- `/user/:id`: trang Profile của 1 user, cho phép chỉnh sửa thông tin và nút chuyển trang quản lí lịch đặt của user đó
- `/user/booking/:id`: trang hiển thị các lịch đặt của user
- `/hotel/:id`: trang xem thông tin 1 hotel

## Reference

[Booking hotel Frontend](https://github.com/congnghiahieu/booking-frontend)

[Booking hotel Backend](https://github.com/congnghiahieu/booking-backend)
