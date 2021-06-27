# git alias cho phép bạn đặt tên thay thế cho các câu lệnh thường dùng. Thay vì phải gõ dài dòng như git commit --amend -s, bạn có thể dùng git config --global alias.cmsa "commit --amend -s", và bùm, từ nay chỉ cần git cmsa là xong.
# Dưới đây là một số alias mà Ehkoo thường dùng:

git config --global alias.a "add"

# Đánh dấu tất cả tập tin trong thư mục hiện tại, chuẩn bị commit
git config --global alias.aa "add . -A"

git config --global alias.c "commit"

# Commit và đặt chữ ký
git config --global alias.cms "commit -s"

# Kết hợp với commit trước đó và đặt chữ ký
git config --global alias.ca "commit --amend -s"

git config --global alias.d "diff"
git config --global alias.ds "diff --stat"

# Hiển thị thay đổi với những tập tin đã được staged
git config --global alias.dc "diff --cached"

git config --global alias.s "status -s"
git config --global alias.co "checkout"

# Checkout  một nhánh mới
git config --global alias.cob "checkout -b"

# Ehkoo đặc biệt thích git lg này:
git config --global alias.lg "log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit"

# Với git log bình thường, bạn sẽ có lịch sử như hình bên trái. Nhưng với git lg, các commit sẽ được gom lại và hiển thị theo dạng đồ thị. Dễ nhìn hơn nhiều.
# Bạn có thể xem thêm các aliases khác ở GitAlias/gitalias. À, đừng quên git yolo!