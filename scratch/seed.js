const pbUrl = "https://pocketbase.ninhngochieu.online";
const prefix = "hieuninhcv_";

const bio = {
    name: "Ninh Ngọc Hiếu",
    title: "Fullstack Developer",
    summary: "Là một lập trình viên có niềm đam mê phần mềm và luôn không ngừng học hỏi và cập nhật công nghệ mới. Với kỹ năng giải quyết vấn đề tốt, khả năng làm việc nhóm hiệu quả và tính cách hòa đồng.",
    email: "ninhngochieu@gmail.com",
    github: "github.com/ninhngochieu",
    linkedin: "linkedin.com/in/ninhngochieu",
    location: "Hà Nội, Việt Nam"
};

const experience = [
    {
        company: "Công ty Cổ phần Công nghệ SAVIS",
        role: "Frontend Developer",
        period: "Tháng 10/2023 - Hiện tại",
        description: "Phát triển giao diện người dùng cho các hệ thống quản lý doanh nghiệp, sử dụng React và Next.js."
    },
    {
        company: "Công ty TNHH Giải pháp Công nghệ Thông tin FSI",
        role: "Junior Developer",
        period: "Tháng 06/2022 - Tháng 09/2023",
        description: "Tham gia phát triển các dự án về số hóa tài liệu và quản lý dữ liệu sử dụng .NET và Angular."
    }
];

const seed = async () => {
    console.log(`Seeding data to ${pbUrl}...`);
    
    const post = async (col, data) => {
        try {
            const res = await fetch(`${pbUrl}/api/collections/${prefix}${col}/records`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            const json = await res.json();
            if (res.ok) console.log(`✓ Seeded ${col}`);
            else console.log(`✗ Failed ${col}: ${json.message}`);
        } catch (e) {
            console.log(`! Error ${col}: ${e.message}`);
        }
    };

    await post('bio', bio);
    for (const exp of experience) await post('experience', exp);
    console.log("Seed finished.");
};

seed();
