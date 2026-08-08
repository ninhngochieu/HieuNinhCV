# HieuNinh CV — portfolio Next.js (frontend-only)

Portfolio cá nhân, **không backend, không database**. Nội dung lấy từ file JSON
tĩnh (`frontend/src/data/portfolio.json`), render lúc build/SSR bởi Next.js 16.

Yêu cầu: **Node 22** (xem `.nvmrc`). Không cần .NET, không cần PocketBase.

## Quick start

```bash
git clone <repo> && cd HieuNinhCV/frontend
npm ci
npm run dev          # http://localhost:3000
```

## Chỉnh sửa nội dung

- **Data**: `frontend/src/data/portfolio.json`
  (schema & types: `frontend/src/data/portfolio.ts`).
  Validate tự động khi build (`npm run build`) và trong CI.
- **Giao diện**: `frontend/src/app/page.tsx`,
  `frontend/src/app/components/PortfolioSection.tsx`,
  `frontend/src/app/globals.css`.

## Kiểm tra trước khi push

```bash
npm run lint && npx tsc --noEmit && npm run build
```

## Build & chạy container

```bash
docker build -t <registry>/hieuninhcv:latest ./frontend
docker run -p 3000:3000 <registry>/hieuninhcv:latest
# hoặc: docker compose up --build   (port 3000)
```

Image được push lên zot registry (`zot:5000/hieuninhcv`) và GHCR qua CI.

## Trạng thái

Xem `STATE.md` để biết lịch sử refactor (pivot frontend-only, autoplan reviews).

> Ghi chú: `HieuNinhCV.AppHost/`, `HieuNinhCV.slnx` là tàn dư .NET/Aspire
> (đã bỏ backend). Chúng không build được và sẽ bị xoá trong tương lai.
