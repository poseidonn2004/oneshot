# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

## Cấu hình AI (VietAPI)

Ứng dụng gọi AI qua [VietAPI](https://vietapi.tech) — endpoint tương thích OpenAI.

1. Tạo file `.env` ở thư mục gốc:

```env
VITE_VIETAPI_API_KEY=sk-...
VITE_VIETAPI_BASE_URL=https://api.vietapi.tech/v1
VITE_VIETAPI_MODEL=gpt
```

2. Chạy dev server:

```bash
npm install
npm run dev
```

`VITE_VIETAPI_MODEL` nhận tên model bất kỳ có trên trang [Models](https://vietapi.tech/models.html), ví dụ `gpt`, `opus`, `claude-sonnet-5`, `deepseek-v4-flash`, `glm`, `kimi`.

> Lưu ý: biến `VITE_*` được nhúng vào bundle phía trình duyệt. Nếu deploy công khai, hãy gọi VietAPI qua backend/proxy để giấu API key.

---

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
