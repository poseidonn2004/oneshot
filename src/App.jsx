import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Video,
  Sparkles,
  FileText,
  Play,
  Pause,
  RotateCcw,
  Camera,
  CameraOff,
  FlipHorizontal,
  FlipVertical,
  Type,
  Clock,
  Zap,
  Bookmark,
  Trash2,
  Copy,
  Check,
  Download,
  AlertTriangle,
  Volume2,
  VolumeX,
  Wand2,
  Eye,
  Flame,
  Wind,
  RefreshCw,
  Mic,
  Film,
  Layers,
  Save,
  FolderOpen,
  Users,
  MessageCircle,
  Repeat
} from 'lucide-react';

// ==========================================
// DỮ LIỆU KỊCH BẢN MẪU (VĂN NÓI ĐỜI THƯỜNG - NGƯỜI DÙNG THẬT CHIA SẺ)
// ==========================================
const SAMPLE_SCRIPTS = [
  {
    id: 'sample-1',
    title: 'Chia sẻ thật: Tai nghe chống ồn cứu mình ở văn phòng (45s)',
    topic: 'Trải nghiệm thực tế dùng tai nghe chống ồn khi ngồi làm việc ở văn phòng đông người hay nói chuyện',
    style: 'Người dùng thật chia sẻ (Review mộc)',
    selfPronoun: 'mình',
    audiencePronoun: 'các bạn',
    targetDuration: 45,
    wpm: 140,
    createdAt: 'Mẫu thực tế',
    hook: '[Đang đeo tai nghe, tháo 1 bên ra nhìn ống kính cười nhẹ 👀] Nói thật với **các bạn** chứ ngồi văn phòng mà xung quanh cứ râm ran tiếng nói chuyện thì **mình** chịu, không tài nào tập trung nổi! [Tiến sát lại gần camera 🎥]',
    body: '[Cầm đạo cụ 📦] Đợt trước **mình** bị stress vì cứ đang làm việc lại bị ngắt mạch, thế là bấm bụng mua thử con tai nghe này. [Nhịp thở 🫁] Thực sự là lúc đầu **mình** cũng không kỳ vọng nhiều đâu, nhưng đeo vào bật **chống ồn** lên một cái là... [Nhịp thở / Nghỉ 1s] ôi nó **im phăng phắc** luôn **các bạn** ạ! [Đổi góc / Xoay người 🔄] Tiếng gõ phím cạch cạch với tiếng mọi người bàn việc xung quanh gần như **tắt hẳn**. [Nhìn thẳng ống kính 👀] Điểm **mình** ưng nhất là cái đệm tai này nó mềm, **mình** đeo làm việc liền một mạch từ sáng tới trưa mà tai **không hề bị đau** hay bí một chút nào.',
    cta: '[Chỉ tay xuống góc màn hình 👇] Bạn nào cũng hay mất tập trung giống **mình** thì tham khảo thử ở góc trái nhé, **mình** dùng thấy đáng đồng tiền bát gạo thật sự! [Cười tự nhiên 😊]'
  },
  {
    id: 'sample-2',
    title: 'Tâm sự thật: Cú vấp khi mới nghỉ việc ra làm tự do (60s)',
    topic: 'Chia sẻ bài học xương máu của bản thân sau khi tự nghỉ việc văn phòng ra làm tự do',
    style: 'Tâm sự đời thường / Kể chuyện thật',
    selfPronoun: 'em',
    audiencePronoun: 'anh chị',
    targetDuration: 60,
    wpm: 135,
    createdAt: 'Mẫu thực tế',
    hook: '[Ngồi gần máy, giọng trầm chân thành 👀] Có **anh chị** nào ở đây đang chán cảnh đi làm 8 tiếng rồi muốn viết đơn nghỉ việc ngay ngày mai giống **em** hồi năm ngoái không? [Nhịp thở / Nghỉ 1s] Nghe **em** kể câu chuyện thật của **em** đã nhé! [Zoom / Tiến lại gần 🎥]',
    body: 'Hồi mới nghỉ việc, **em** tự tin lắm, cứ nghĩ mình giỏi chuyên môn thì ra ngoài thiếu gì khách. [Nhịp thở 🫁] Nhưng thực tế nó vả cho tỉnh người luôn **anh chị** ạ. Suốt **3 tháng đầu**, gần như **em** không có một đồng thu nhập mới nào. [Đổi góc / Xoay người 🔄] Lúc đi làm công ty thì chỉ cần làm tốt đúng việc của mình thôi, còn lúc ra làm riêng một mình, **em** phải tự đi kiếm khách, tự báo giá, tự đòi công nợ... **ngợp thực sự**! [Nhịp thở 🫁] Phải mất gần nửa năm chật vật **em** mới nhận ra: trước khi nghỉ việc, nhất định phải có sẵn khoản **tiền dự phòng 6 tháng** và ít nhất **2-3 khách hàng quen** đã.',
    cta: '[Gật đầu chân thành 👀] **Em** chia sẻ thật từ trải nghiệm đau thương của mình, **anh chị** lưu lại để cân nhắc thật kỹ trước khi quyết định nhé!'
  },
  {
    id: 'sample-3',
    title: 'Trải nghiệm cá nhân: Bỏ thói quen thức khuya bấm điện thoại (30s)',
    topic: 'Cách mình tự cai thói quen lướt điện thoại đến 2h sáng khiến sáng hôm sau mệt rã rời',
    style: 'Gần gũi như bạn bè tám chuyện',
    selfPronoun: 'tớ',
    audiencePronoun: 'mọi người',
    targetDuration: 30,
    wpm: 130,
    createdAt: 'Mẫu thực tế',
    hook: '[Cầm điện thoại đặt úp xuống bàn 👀] Trước đây đêm nào **tớ** cũng tự hứa "lướt 5 phút nữa thôi rồi ngủ", thế mà ngẩng lên toàn **2 giờ sáng** **mọi người** ạ! [Nhịp thở 🫁]',
    body: '[Tiến nhẹ lại gần camera 🎥] Sáng hôm sau dậy người cứ lờ đờ như đi mượn. Xong tuần trước **tớ** thử đúng một mẹo cực kỳ đơn giản: cứ 11 giờ đêm là **tớ** cắm sạc điện thoại ở **ngoài phòng khách**, không mang vào giường nữa. [Nhịp thở / Nghỉ 1s] Mấy hôm đầu tay chân cũng bứt rứt phết đấy, nhưng chỉ sau **4 ngày** thôi là **tớ** ngủ sâu giấc hẳn, sáng dậy tỉnh táo khác bọt hoàn toàn.',
    cta: '[Mỉm cười ấm áp 😊] Tối nay **mọi người** thử để điện thoại xa giường một hôm xem sao nhé, hiệu quả bất ngờ luôn đấy!'
  },
  {
    id: 'sample-4',
    title: 'Mẹo nói trước ống kính tự nhiên không bị đơ (45s)',
    topic: 'Cách mình vượt qua nỗi sợ nói trước camera bị cứng nhắc như đọc văn mẫu',
    style: 'Chia sẻ kinh nghiệm thực chiến',
    selfPronoun: 'tôi',
    audiencePronoun: 'anh em',
    targetDuration: 45,
    wpm: 145,
    createdAt: 'Mẫu thực tế',
    hook: '[Giơ điện thoại lên rồi hạ xuống cười 👀] Hồi mới tập quay video, cứ bật máy lên là mặt **tôi** đơ cứng, nói năng cứ như học sinh **đọc văn mẫu** ấy **anh em** ạ! [Nhịp thở 🫁]',
    body: 'Quay đi quay lại cả chục lần vẫn thấy giả trân. [Đổi góc / Xoay người 🔄] Sau này **tôi** mới phát hiện ra một mẹo: đừng cố học thuộc lòng từng chữ nữa! **Anh em** cứ tưởng tượng cái ống kính camera kia là **thằng bạn thân** đang ngồi đối diện ở quán cà phê. [Nhịp thở 🫁] Bình thường ở ngoài **anh em** kể chuyện cho bạn nghe dùng từ gì thì lên video cứ nói y hệt thế. [Nhấn giọng 🔥] Thậm chí lỡ có **vấp nhẹ một chữ** hay cười phì ra cũng cứ để nguyên, chính cái sự tự nhiên đấy mới làm người xem thấy gần gũi!',
    cta: '[Chỉ tay vào màn hình 👇] **Anh em** bật thử ngay cái máy nhắc chữ bên cạnh lên rồi nói chuyện tự nhiên như đang tám với **tôi** xem mượt hơn hẳn không nhé!'
  }
];

// Các gợi ý cặp Xưng - Hô phổ biến
const PRONOUN_PRESETS = [
  { self: 'mình', audience: 'các bạn', label: 'Mình - Các bạn' },
  { self: 'mình', audience: 'mọi người', label: 'Mình - Mọi người' },
  { self: 'em', audience: 'anh chị', label: 'Em - Anh/Chị' },
  { self: 'em', audience: 'các bác', label: 'Em - Các bác' },
  { self: 'tôi', audience: 'anh em', label: 'Tôi - Anh em' },
  { self: 'tớ', audience: 'cậu', label: 'Tớ - Cậu' },
];

// Danh sách thẻ chèn nhanh (Quick Stage Direction Tags)
const QUICK_TAGS = [
  { label: 'Nhịp thở 🫁', tag: '[Nhịp thở 🫁]', color: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40' },
  { label: 'Nghỉ 1s ⏱️', tag: '[Nhịp thở / Nghỉ 1s]', color: 'bg-blue-500/20 text-blue-300 border-blue-500/40' },
  { label: 'Nhấn giọng 🔥', tag: '**từ khóa nhấn mạnh**', color: 'bg-amber-500/20 text-amber-300 border-amber-500/40' },
  { label: 'Tiến gần Cam 🎥', tag: '[Zoom / Tiến lại gần 🎥]', color: 'bg-purple-500/20 text-purple-300 border-purple-500/40' },
  { label: 'Đổi góc người 🔄', tag: '[Đổi góc / Xoay người 🔄]', color: 'bg-pink-500/20 text-pink-300 border-pink-500/40' },
  { label: 'Cầm đạo cụ 📦', tag: '[Cầm đạo cụ 📦]', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' },
  { label: 'Nhìn thẳng ống kính 👀', tag: '[Nhìn thẳng ống kính 👀]', color: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40' },
  { label: 'Chỉ tay CTA 👇', tag: '[Chỉ tay xuống dưới 👇]', color: 'bg-rose-500/20 text-rose-300 border-rose-500/40' },
];

// Phong cách review / chào hàng bằng khẩu ngữ (bán hàng thân thiện, thuyết phục)
const SALES_STYLE = 'Review / Chào hàng sản phẩm (Khẩu ngữ bán hàng)';

const STYLES = [
  SALES_STYLE,
  'Người dùng thật chia sẻ (Review mộc)',
  'Tâm sự đời thường / Kể chuyện thật',
  'Gần gũi như bạn bè tám chuyện',
  'Chia sẻ kinh nghiệm thực chiến',
  'Hài hước duyên dáng đời thường'
];

const DURATIONS = [
  { label: '15s (Story)', value: 15 },
  { label: '30s (Ngắn gọn)', value: 30 },
  { label: '45s (Vừa đẹp)', value: 45 },
  { label: '60s (Tiêu chuẩn)', value: 60 },
  { label: '90s (Tâm sự sâu)', value: 90 },
  { label: '180s (Vlog 3p)', value: 180 },
];

// ==========================================
// TIỆN ÍCH ÂM THANH (WEB AUDIO API BEEP)
// ==========================================
const playBeep = (freq = 600, duration = 0.15, type = 'sine') => {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    gain.gain.setValueAtTime(0.25, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch (e) {
    // Bỏ qua nếu trình duyệt chặn tự động phát âm thanh
  }
};

// ==========================================
// HÀM ĐỔI XƯNG HÔ HÀNG LOẠT TRONG VĂN BẢN TIẾNG VIỆT
// ==========================================
const replacePronounsInText = (text, newSelf, newAudience) => {
  if (!text) return text;
  let updated = text;

  const cleanSelf = newSelf.trim();
  const cleanAudience = newAudience.trim();

  if (cleanAudience) {
    // Thay thế các cụm gọi người xem phổ biến (ưu tiên cụm dài trước)
    const audiencePatterns = [
      'các anh chị',
      'anh chị em',
      'anh chị',
      'các bạn',
      'mọi người',
      'anh em',
      'các bác',
      'cả nhà',
      'các cậu'
    ];
    audiencePatterns.forEach((pat) => {
      if (pat.toLowerCase() === cleanAudience.toLowerCase()) return;
      const regex = new RegExp(`(^|[^\\p{L}])(${pat})(?=[^\\p{L}]|$)`, 'giu');
      updated = updated.replace(regex, (match, prefix, word) => {
        const isCapitalized = word[0] === word[0].toUpperCase() && word[0] !== word[0].toLowerCase();
        const replacement = isCapitalized
          ? cleanAudience.charAt(0).toUpperCase() + cleanAudience.slice(1)
          : cleanAudience;
        return `${prefix}${replacement}`;
      });
    });
  }

  if (cleanSelf) {
    // Thay thế các đại từ tự xưng phổ biến (tránh chạm vào các từ ghép như "tự mình", "chúng mình", "anh em")
    const selfPatterns = ['mình', 'tớ', 'tôi', 'tui', 'admin'];
    selfPatterns.forEach((pat) => {
      if (pat.toLowerCase() === cleanSelf.toLowerCase()) return;
      const regex = new RegExp(`(^|[^\\p{L}])(${pat})(?=[^\\p{L}]|$)`, 'giu');
      updated = updated.replace(regex, (match, prefix, word) => {
        const isCapitalized = word[0] === word[0].toUpperCase() && word[0] !== word[0].toLowerCase();
        const replacement = isCapitalized
          ? cleanSelf.charAt(0).toUpperCase() + cleanSelf.slice(1)
          : cleanSelf;
        return `${prefix}${replacement}`;
      });
    });
  }

  return updated;
};

// ==========================================
// HÀM RENDER VĂN BẢN CÓ HIGHLIGHT ĐẠO DIỄN & NHẤN GIỌNG
// ==========================================
const FormattedScriptText = ({ text, isTeleprompter = false }) => {
  if (!text) return null;

  const regex = /(\[.*?\]|\*\*.*?\*\*)/g;
  const parts = text.split(regex);

  return (
    <span>
      {parts.map((part, idx) => {
        if (part.startsWith('[') && part.endsWith(']')) {
          const isBreath = part.toLowerCase().includes('thở') || part.toLowerCase().includes('nghỉ');
          return (
            <span
              key={idx}
              className={`inline-block mx-1 px-2 py-0.5 rounded-md font-semibold tracking-wide ${
                isTeleprompter
                  ? isBreath
                    ? 'bg-cyan-500/30 text-cyan-300 border border-cyan-400/50 text-[0.75em] align-middle'
                    : 'bg-amber-500/30 text-amber-300 border border-amber-400/50 text-[0.75em] align-middle'
                  : isBreath
                  ? 'bg-cyan-950/90 text-cyan-300 border border-cyan-700/60 text-xs'
                  : 'bg-purple-950/90 text-purple-300 border border-purple-700/60 text-xs'
              }`}
            >
              {part}
            </span>
          );
        }
        if (part.startsWith('**') && part.endsWith('**')) {
          const cleanWord = part.slice(2, -2);
          return (
            <strong
              key={idx}
              className={`${
                isTeleprompter
                  ? 'text-amber-400 underline decoration-amber-400/80 decoration-2 underline-offset-4 font-extrabold'
                  : 'text-amber-400 font-bold bg-amber-500/10 px-1 rounded'
              }`}
            >
              {cleanWord}
            </strong>
          );
        }
        return <span key={idx}>{part}</span>;
      })}
    </span>
  );
};

// ==========================================
// BÓC TÁCH JSON TỪ PHẢN HỒI AI (CHỐNG LỖI MARKDOWN / VĂN BẢN THỪA)
// ==========================================
const parseAIJson = (raw) => {
  if (!raw) throw new Error('AI không trả về nội dung');

  let text = String(raw).trim();
  text = text.replace(/^```(?:json)?\s*/i, '').replace(/```\s*$/, '').trim();

  try {
    return JSON.parse(text);
  } catch {
    // Thử tìm object JSON đầu tiên trong câu trả lời
    const start = text.indexOf('{');
    const end = text.lastIndexOf('}');
    if (start !== -1 && end > start) {
      return JSON.parse(text.slice(start, end + 1));
    }
    throw new Error('Phản hồi của AI không phải JSON hợp lệ');
  }
};

// ==========================================
// COMPONENT CHÍNH: APP
// ==========================================
export default function App() {
  // Navigation Tabs: 'workspace' | 'teleprompter' | 'library'
  const [activeTab, setActiveTab] = useState('workspace');

  // State Cấu hình AI & Xưng hô tùy chỉnh
  const [topic, setTopic] = useState('Review thật dịch vụ dán decal đổi màu xe: mẫu vân, độ bền và chế độ bảo hành');
  const [style, setStyle] = useState(SALES_STYLE);
  const [selfPronoun, setSelfPronoun] = useState('em');
  const [audiencePronoun, setAudiencePronoun] = useState('các bác');
  const [targetDuration, setTargetDuration] = useState(45);
  const [wpm, setWpm] = useState(140);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [aiError, setAiError] = useState('');

  // State Nội dung kịch bản hiện tại
  const [scriptTitle, setScriptTitle] = useState(SAMPLE_SCRIPTS[0].title);
  const [hookText, setHookText] = useState(SAMPLE_SCRIPTS[0].hook);
  const [bodyText, setBodyText] = useState(SAMPLE_SCRIPTS[0].body);
  const [ctaText, setCtaText] = useState(SAMPLE_SCRIPTS[0].cta);
  const [activeSection, setActiveSection] = useState('body');

  // State Lưu trữ kịch bản (LocalStorage v2)
  const [savedScripts, setSavedScripts] = useState(() => {
    try {
      const saved = localStorage.getItem('oneshot_saved_scripts_v2');
      return saved ? JSON.parse(saved) : SAMPLE_SCRIPTS;
    } catch {
      return SAMPLE_SCRIPTS;
    }
  });
  const [notification, setNotification] = useState(null);
  const [copied, setCopied] = useState(false);

  // State Chế độ Teleprompter & Studio
  const [isPlaying, setIsPlaying] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [scrollSpeed, setScrollSpeed] = useState(3);
  const [fontSize, setFontSize] = useState(36);
  const [overlayOpacity, setOverlayOpacity] = useState(65);
  const [mirrorText, setMirrorText] = useState(false);
  const [mirrorCam, setMirrorCam] = useState(true);
  const [cameraEnabled, setCameraEnabled] = useState(false);
  const [cameraError, setCameraError] = useState('');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [prompterWidth, setPrompterWidth] = useState(75);

  // Refs
  const hookRef = useRef(null);
  const bodyRef = useRef(null);
  const ctaRef = useRef(null);
  const prompterScrollRef = useRef(null);
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const animFrameRef = useRef(null);
  const lastScrollTimeRef = useRef(null);

  useEffect(() => {
    try {
      localStorage.setItem('oneshot_saved_scripts_v2', JSON.stringify(savedScripts));
    } catch (e) {
      console.error('Lỗi lưu localStorage:', e);
    }
  }, [savedScripts]);

  const showToast = (msg, type = 'success') => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 3200);
  };

  // ==========================================
  // ĐỔI XƯNG HÔ HÀNG LOẠT NGAY TRÊN KỊCH BẢN ĐANG SOẠN
  // ==========================================
  const handleApplyPronounsToCurrentScript = (customSelf = selfPronoun, customAud = audiencePronoun) => {
    if (!customSelf.trim() && !customAud.trim()) {
      showToast('Vui lòng nhập từ xưng hô trước khi áp dụng!', 'warning');
      return;
    }
    setHookText(prev => replacePronounsInText(prev, customSelf, customAud));
    setBodyText(prev => replacePronounsInText(prev, customSelf, customAud));
    setCtaText(prev => replacePronounsInText(prev, customSelf, customAud));
    showToast(`Đã cập nhật xưng hô "${customSelf} - ${customAud}" vào toàn bộ kịch bản!`);
  };

  // ==========================================
  // TÍNH TOÁN THỐNG KÊ KỊCH BẢN (REAL-TIME METRICS)
  // ==========================================
  const metrics = useMemo(() => {
    const fullRaw = `${hookText} ${bodyText} ${ctaText}`;
    const spokenOnly = fullRaw
      .replace(/\[.*?\]/g, ' ')
      .replace(/\*\*/g, '')
      .trim();

    const words = spokenOnly ? spokenOnly.split(/\s+/).filter(Boolean) : [];
    const wordCount = words.length;

    const breathMatches = fullRaw.match(/\[.*?(thở|nghỉ).*?\]/gi) || [];
    const breathCount = breathMatches.length;

    const stageMatches = fullRaw.match(/\[.*?\]/g) || [];
    const stageCount = stageMatches.length;

    const readingSeconds = Math.round((wordCount / wpm) * 60 + breathCount * 1);

    const sentencesWithoutBreath = spokenOnly.split(/[.!?]+/).filter(s => s.trim().split(/\s+/).length > 35);
    const isOutOfBreathRisk =
      (wordCount > 75 && breathCount === 0) ||
      sentencesWithoutBreath.length > 0 ||
      readingSeconds > targetDuration * 1.25;

    return {
      wordCount,
      breathCount,
      stageCount,
      readingSeconds,
      isOutOfBreathRisk,
      targetWords: Math.round((targetDuration / 60) * wpm)
    };
  }, [hookText, bodyText, ctaText, wpm, targetDuration]);

  // ==========================================
  // TÍCH HỢP VIETAPI (OPENAI-COMPATIBLE) - VĂN PHONG NÓI ĐỜI THƯỜNG
  // Base URL: https://api.vietapi.tech/v1 (đổi qua VITE_VIETAPI_BASE_URL)
  // Model:    gpt / opus / claude-sonnet-5 / deepseek-v4-flash... (VITE_VIETAPI_MODEL)
  // ==========================================
  const callAI = async (promptText, systemInstructionText) => {
    const apiKey = import.meta.env.VITE_VIETAPI_API_KEY || '';
    const baseUrl = (import.meta.env.VITE_VIETAPI_BASE_URL || 'https://api.vietapi.tech/v1').replace(/\/+$/, '');
    const model = import.meta.env.VITE_VIETAPI_MODEL || 'gpt';

    if (!apiKey) {
      throw new Error('Chưa cấu hình VITE_VIETAPI_API_KEY trong file .env');
    }

    const jsonRule = `

QUY TẮC ĐẦU RA BẮT BUỘC: Chỉ trả về DUY NHẤT một object JSON hợp lệ, không kèm markdown, không giải thích gì thêm. Cấu trúc chính xác:
{"title":"...","hook":"...","body":"...","cta":"..."}
- title: tiêu đề ngắn gọn cho kịch bản
- hook: 3-5 giây mở đầu
- body: phần chia sẻ chính
- cta: lời nhắn/lời kêu gọi cuối`;

    const messages = [
      { role: 'system', content: systemInstructionText + jsonRule },
      { role: 'user', content: promptText }
    ];

    let useJsonMode = true;
    let delay = 1000;

    for (let attempt = 0; attempt < 4; attempt++) {
      try {
        const payload = {
          model,
          messages,
          temperature: 0.9,
          ...(useJsonMode ? { response_format: { type: 'json_object' } } : {})
        };

        const res = await fetch(`${baseUrl}/chat/completions`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`
          },
          body: JSON.stringify(payload)
        });

        if (!res.ok) {
          const detail = await res.text().catch(() => '');

          // Model không hỗ trợ JSON mode -> tắt đi và thử lại ngay
          if (res.status === 400 && useJsonMode) {
            useJsonMode = false;
            continue;
          }

          const hints = {
            401: 'API key VietAPI không hợp lệ hoặc đã hết hạn',
            402: 'Tài khoản VietAPI đã hết credit',
            403: 'API key không có quyền dùng model này',
            404: 'Không tìm thấy model đã cấu hình trong file .env',
            429: 'VietAPI đang giới hạn tốc độ, vui lòng thử lại sau'
          };
          const error = new Error(
            hints[res.status] ||
              `VietAPI lỗi HTTP ${res.status}${detail ? `: ${detail.slice(0, 160)}` : ''}`
          );
          error.noRetry = res.status !== 429 && res.status < 500;
          throw error;
        }

        const data = await res.json();
        const raw = data?.choices?.[0]?.message?.content;
        if (!raw) throw new Error('Không nhận được phản hồi hợp lệ từ AI');
        return parseAIJson(raw);
      } catch (err) {
        if (err.noRetry || attempt === 3) throw err;
        await new Promise(r => setTimeout(r, delay));
        delay *= 2;
      }
    }
  };

  const handleGenerateScript = async () => {
    if (!topic.trim()) {
      showToast('Vui lòng nhập chủ đề hoặc trải nghiệm muốn chia sẻ!', 'warning');
      return;
    }
    setIsGenerating(true);
    setAiError('');

    const targetWords = Math.round((targetDuration / 60) * wpm);
    const activeSelf = selfPronoun.trim() || 'mình';
    const activeAudience = audiencePronoun.trim() || 'các bạn';

    const isSalesTone = style === SALES_STYLE;

    const commonRules = `Bạn là người viết kịch bản thoại quay video One-Shot (quay 1 cú máy liền mạch, không cắt cảnh) bằng tiếng Việt.
QUY TẮC CHUNG (BẮT BUỘC):
- Xưng hô: người nói tự xưng "${activeSelf}", gọi người xem là "${activeAudience}" xuyên suốt từ đầu đến cuối kịch bản.
- Câu văn chia thành các vế ngắn gọn, đọc một hơi không bị vấp.
- Chèn chỉ dẫn diễn xuất, cử chỉ và nhịp lấy hơi trong ngoặc vuông: [Nhìn thẳng ống kính 👀], [Zoom / Tiến lại gần 🎥], [Nhịp thở 🫁], [Đổi góc / Xoay người 🔄], [Cầm đạo cụ 📦], [Nhịp thở / Nghỉ 1s]. Ngoặc vuông CHỈ dùng cho chỉ dẫn diễn xuất, tuyệt đối không dùng để đánh dấu tên, địa chỉ, giá hay ghi chú.
- Đánh dấu các từ cần nhấn giọng bằng cặp dấu sao kép: **từ khóa nhấn mạnh**.
- Tổng số từ thoại đọc thực tế (không tính phần trong ngoặc vuông) khoảng ${targetWords} từ để khớp thời lượng ${targetDuration} giây ở tốc độ nói ${wpm} từ/phút.`;

    const salesRules = `GIỌNG ĐIỆU BẮT BUỘC: REVIEW / CHÀO HÀNG BẰNG KHẨU NGỮ (ƯU TIÊN SỐ 1)
1. Viết như đang tư vấn trực tiếp cho khách quen: thân thiện, nhiệt tình, tự tin và trấn an. Dùng khẩu ngữ đời thường ("${activeAudience} ạ", "được hết nhé", "${activeAudience} cứ yên tâm", "em cam kết luôn").
2. Đi đúng trình tự 5 nhịp:
   (1) Hook: hỏi hoặc chạm đúng điều khách đang băn khoăn (mẫu mã, màu vân, giá, độ bền, có để lại keo khi bóc không...).
   (2) Ưu điểm cụ thể: nêu lợi ích thực tế nhìn thấy được (điểm nhấn, che xước, lên form, độ bền...), càng chi tiết càng đáng tin.
   (3) Cam kết chất lượng: bảo hành, thi công sạch, không để lại keo, không bong tróc... nói chắc nịch để xóa bỏ e ngại.
   (4) Mở rộng dịch vụ: gợi thêm sản phẩm/dịch vụ liên quan phù hợp (PPF, phim cách nhiệt, dán nóc, vệ sinh nội thất...).
   (5) CTA + định danh: mời liên hệ tư vấn/kết bạn/để lại bình luận, rồi chốt bằng một câu giới thiệu ngắn gọn về bản thân hoặc bên làm (tên, nơi làm, số năm kinh nghiệm). Nếu chủ đề không có tên/địa chỉ cụ thể thì nói tự nhiên kiểu "bên em", "em ở gara", "em làm bên chỗ các bác hay qua" — KHÔNG bịa tên và KHÔNG để chỗ trống như [Tên].
3. Bán hàng bằng trải nghiệm thật và chi tiết cụ thể; TUYỆT ĐỐI không dùng từ sáo rỗng ("siêu phẩm", "giải pháp hoàn hảo", "không thể bỏ lỡ", "số 1 thị trường").
4. Nếu chủ đề không phải sản phẩm/dịch vụ: vẫn giữ giọng thân thiện, nhiệt tình, nhưng bỏ phần cam kết chất lượng và định danh bản thân.`;

    const naturalRules = `GIỌNG ĐIỆU BẮT BUỘC: CHIA SẺ ĐỜI THƯỜNG, MỘC MẠC
1. Sử dụng 100% VĂN NÓI ĐỜI THƯỜNG, chân thật như một người dùng thật đang tâm sự hoặc kể lại trải nghiệm cá nhân cho bạn bè nghe.
2. TUYỆT ĐỐI TRÁNH văn phong quảng cáo sáo rỗng, văn viết sách vở, câu chữ kịch bản cứng nhắc (CẤM: "Bạn đang đau đầu vì...", "Siêu phẩm không thể bỏ lỡ", "Giải pháp hoàn hảo", "Thứ nhất là, thứ hai là...", "Hãy cùng khám phá").
3. Dùng từ nối và khẩu ngữ tự nhiên vừa phải: "Nói thật với ${activeAudience} là...", "Thực sự đợt trước ${activeSelf} cũng...", "Công nhận một điều là...", "Cái điểm mà ${activeSelf} ưng nhất...", "${activeAudience} biết sao không...".`;

    const systemPrompt = `${commonRules}\n\n${isSalesTone ? salesRules : naturalRules}`;

    const userPrompt = `Hãy viết kịch bản thoại One-Shot theo đúng giọng điệu đã yêu cầu với thông tin sau:
- Chủ đề / Sản phẩm / Trải nghiệm: "${topic}"
- Phong cách nói: ${style}
- Xưng hô bắt buộc: Tự xưng là "${activeSelf}" - Gọi người xem là "${activeAudience}"
- Thời lượng mục tiêu: ${targetDuration} giây (~${targetWords} từ thoại).
${isSalesTone
      ? `Viết như đang tư vấn trực tiếp cho khách: mở bằng nỗi băn khoăn thật của "${activeAudience}", nêu ưu điểm cụ thể, cam kết chắc nịch, gợi mở dịch vụ liên quan, chốt bằng lời mời liên hệ và giới thiệu ngắn gọn về bản thân/bên làm.`
      : 'Hãy viết sao cho khi người quay đọc lên nghe tự nhiên y như đang trò chuyện trực tiếp ngoài đời thực, không ai nghĩ là đang đọc kịch bản.'}`;

    try {
      const result = await callAI(userPrompt, systemPrompt);
      setScriptTitle(result.title || `Kịch bản: ${topic.slice(0, 30)}...`);
      setHookText(result.hook || '');
      setBodyText(result.body || '');
      setCtaText(result.cta || '');
      showToast(
        `Đã tạo kịch bản ${isSalesTone ? 'review/chào hàng' : 'văn nói đời thường'} (${activeSelf} - ${activeAudience})!`
      );
    } catch (error) {
      setAiError(
        error?.message
          ? `Không thể tạo kịch bản: ${error.message}`
          : 'Không thể kết nối AI lúc này. Vui lòng thử lại sau giây lát.'
      );
      showToast('Lỗi khi gọi AI tạo kịch bản', 'error');
    } finally {
      setIsGenerating(false);
    }
  };

  // Tối ưu hóa kịch bản đang viết dở bằng AI
  const handleOptimizeCurrentScript = async (mode = 'natural_spoken') => {
    if (!hookText.trim() && !bodyText.trim()) {
      showToast('Kịch bản đang trống, hãy nhập nội dung trước!', 'warning');
      return;
    }
    setIsOptimizing(true);
    setAiError('');

    const targetWords = Math.round((targetDuration / 60) * wpm);
    const activeSelf = selfPronoun.trim() || 'mình';
    const activeAudience = audiencePronoun.trim() || 'các bạn';

    const isSalesTone = style === SALES_STYLE;

    const systemPrompt = `Bạn là chuyên gia biên tập lời thoại One-Shot.
BẮT BUỘC dùng cách xưng hô: Người nói xưng "${activeSelf}" - Gọi người xem là "${activeAudience}".
${isSalesTone
      ? `GIỌNG ĐIỆU ĐÍCH: khẩu ngữ bán hàng/review — thân thiện, nhiệt tình, tự tin, trấn an; giữ đúng trình tự hook (chạm đúng băn khoăn) → ưu điểm cụ thể → cam kết chất lượng → mở rộng dịch vụ → CTA + định danh bản thân.`
      : 'GIỌNG ĐIỆU ĐÍCH: văn nói đời thường, mộc mạc, chân thật như người dùng thật đang chia sẻ trải nghiệm; loại bỏ mọi từ ngữ sáo rỗng, sách vở hay mùi quảng cáo.'}
Giữ nguyên hoặc bổ sung hợp lý các thẻ [Nhịp thở 🫁], [Zoom / Tiến lại gần 🎥], [Đổi góc / Xoay người 🔄], [Nhìn thẳng ống kính 👀] và bôi đậm **từ khóa nhấn giọng**.`;

    let taskSpecific = '';
    if (mode === 'natural_spoken') {
      taskSpecific = isSalesTone
        ? `Viết lại toàn bộ kịch bản thành khẩu ngữ review/chào hàng thân thiện, nhiệt tình, tự tin: mở bằng nỗi băn khoăn thật của "${activeAudience}", nêu ưu điểm cụ thể, cam kết chất lượng chắc nịch, gợi mở dịch vụ liên quan, chốt bằng CTA và giới thiệu ngắn gọn về bản thân/bên làm.`
        : `Chuyển toàn bộ kịch bản này sang VĂN NÓI ĐỜI THƯỜNG, mộc mạc, gần gũi như "${activeSelf}" đang ngồi tâm sự thật lòng với "${activeAudience}". Thay các từ ngữ sách vở/quảng cáo bằng ngôn từ đời thực ("nói thật với ${activeAudience}", "trải nghiệm của ${activeSelf} là", "công nhận là...").`;
    } else if (mode === 'breath_and_flow') {
      taskSpecific = `Chia nhỏ các câu dài thành nhịp nói ngắn dễ thở, chèn thêm các điểm [Nhịp thở 🫁] và **nhấn giọng** tự nhiên, đồng thời đồng bộ xưng hô "${activeSelf} - ${activeAudience}".`;
    } else if (mode === 'shorten') {
      taskSpecific = `Rút gọn và cô đọng kịch bản theo văn nói tự nhiên để vừa khít thời lượng ${targetDuration} giây (khoảng ${targetWords} từ thoại), xưng "${activeSelf}" - gọi "${activeAudience}".`;
    } else if (mode === 'punchy_hook') {
      taskSpecific = isSalesTone
        ? `Viết lại câu Hook (3-5s đầu) thật đời thường, chạm đúng băn khoăn của "${activeAudience}" về sản phẩm/dịch vụ (mẫu mã, độ bền, giá, có để lại keo...) để họ dừng lại xem ngay, không dùng câu quảng cáo sáo rỗng.`
        : `Viết lại câu Hook (3-5s đầu) thật đời thường, chạm đúng tâm lý hoặc trải nghiệm thật khiến "${activeAudience}" đồng cảm dừng lại xem ngay, không dùng câu hỏi quảng cáo sáo rỗng.`;
    }

    const userPrompt = `Yêu cầu: ${taskSpecific}
Phong cách: ${style}
Xưng hô bắt buộc: Xưng "${activeSelf}" - Gọi "${activeAudience}"
Kịch bản hiện tại:
- Tiêu đề: ${scriptTitle}
- Hook: ${hookText}
- Body: ${bodyText}
- CTA: ${ctaText}`;

    try {
      const result = await callAI(userPrompt, systemPrompt);
      setScriptTitle(result.title || scriptTitle);
      setHookText(result.hook || hookText);
      setBodyText(result.body || bodyText);
      setCtaText(result.cta || ctaText);
      showToast('Đã tinh chỉnh sang văn nói đời thường tự nhiên!');
    } catch (err) {
      showToast(err?.message || 'Không thể tối ưu kịch bản lúc này.', 'error');
    } finally {
      setIsOptimizing(false);
    }
  };

  // ==========================================
  // CHÈN NHANH THẺ ĐẠO DIỄN (QUICK TAG INSERTION)
  // ==========================================
  const insertQuickTag = (tagText) => {
    const mapRef = {
      hook: { ref: hookRef, value: hookText, setter: setHookText },
      body: { ref: bodyRef, value: bodyText, setter: setBodyText },
      cta: { ref: ctaRef, value: ctaText, setter: setCtaText },
    };

    const current = mapRef[activeSection] || mapRef.body;
    const textarea = current.ref.current;

    if (textarea) {
      const start = textarea.selectionStart ?? current.value.length;
      const end = textarea.selectionEnd ?? current.value.length;
      const selected = current.value.substring(start, end);

      let replacement = ` ${tagText} `;
      if (tagText === '**từ khóa nhấn mạnh**' && selected.trim()) {
        replacement = `**${selected.trim()}**`;
      }

      const newValue =
        current.value.substring(0, start) +
        replacement +
        current.value.substring(end);

      current.setter(newValue);

      setTimeout(() => {
        textarea.focus();
        const newCursor = start + replacement.length;
        textarea.setSelectionRange(newCursor, newCursor);
      }, 20);
    } else {
      current.setter(prev => `${prev.trim()} ${tagText} `);
    }
  };

  // ==========================================
  // QUẢN LÝ LƯU TRỮ & XUẤT KỊCH BẢN
  // ==========================================
  const handleSaveScript = () => {
    const newItem = {
      id: `script-${Date.now()}`,
      title: scriptTitle.trim() || 'Kịch bản chưa đặt tên',
      topic,
      style,
      selfPronoun,
      audiencePronoun,
      targetDuration,
      wpm,
      createdAt: new Date().toLocaleDateString('vi-VN', {
        hour: '2-digit',
        minute: '2-digit'
      }),
      hook: hookText,
      body: bodyText,
      cta: ctaText
    };
    setSavedScripts(prev => [newItem, ...prev]);
    showToast('Đã lưu kịch bản vào Thư viện!');
  };

  const handleLoadScript = (item) => {
    setScriptTitle(item.title);
    setTopic(item.topic || '');
    setStyle(item.style || STYLES[0]);
    if (item.selfPronoun) setSelfPronoun(item.selfPronoun);
    if (item.audiencePronoun) setAudiencePronoun(item.audiencePronoun);
    setTargetDuration(item.targetDuration || 45);
    setWpm(item.wpm || 140);
    setHookText(item.hook || '');
    setBodyText(item.body || '');
    setCtaText(item.cta || '');
    setActiveTab('workspace');
    showToast(`Đã tải kịch bản: "${item.title}"`);
  };

  const handleDeleteScript = (id) => {
    setSavedScripts(prev => prev.filter(s => s.id !== id));
    showToast('Đã xóa kịch bản khỏi danh sách lưu.');
  };

  const handleCopyScript = () => {
    const textToCopy = `🎬 KỊCH BẢN ONE-SHOT: ${scriptTitle}\n🗣️ Xưng hô: ${selfPronoun} - ${audiencePronoun} | ⏱️ Thời lượng: ~${metrics.readingSeconds}s (${metrics.wordCount} từ)\n\n🔥 [HOOK - 3-5s ĐẦU]\n${hookText}\n\n📖 [CHIA SẺ THỰC TẾ - BODY]\n${bodyText}\n\n🎯 [LỜI NHẮN CUỐI - CTA]\n${ctaText}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    showToast('Đã sao chép toàn bộ kịch bản vào bộ nhớ tạm!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadTxt = () => {
    const content = `========================================\nKỊCH BẢN QUAY ONE-SHOT: ${scriptTitle.toUpperCase()}\nXưng hô: ${selfPronoun} - ${audiencePronoun} | Phong cách: ${style}\nThời lượng đọc: ~${metrics.readingSeconds} giây (${metrics.wordCount} từ)\n========================================\n\n1. HOOK (3-5 GIÂY ĐẦU):\n${hookText}\n\n2. NỘI DUNG CHIA SẺ (BODY):\n${bodyText}\n\n3. LỜI NHẮN CUỐI (CTA):\n${ctaText}\n`;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${scriptTitle.replace(/\s+/g, '_')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Đã tải xuống file kịch bản (.txt)!');
  };

  // ==========================================
  // QUẢN LÝ WEBCAM & TELEPROMPTER STUDIO
  // ==========================================
  const startCamera = async () => {
    setCameraError('');
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 1280 }, height: { ideal: 720 }, facingMode: 'user' },
        audio: false
      });
      streamRef.current = mediaStream;
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      setCameraEnabled(true);
    } catch (err) {
      setCameraError('Không thể truy cập Camera. Hãy kiểm tra quyền truy cập trình duyệt hoặc dùng chế độ nền tối.');
      setCameraEnabled(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setCameraEnabled(false);
  };

  const toggleCamera = () => {
    if (cameraEnabled) {
      stopCamera();
    } else {
      startCamera();
    }
  };

  useEffect(() => {
    if (activeTab === 'teleprompter' && cameraEnabled && streamRef.current && videoRef.current) {
      videoRef.current.srcObject = streamRef.current;
    }
    if (activeTab !== 'teleprompter') {
      setIsPlaying(false);
      setCountdown(0);
    }
  }, [activeTab, cameraEnabled]);

  useEffect(() => {
    return () => stopCamera();
  }, []);

  const handleStartTeleprompter = () => {
    if (isPlaying) {
      setIsPlaying(false);
      return;
    }
    if (countdown > 0) return;

    const container = prompterScrollRef.current;
    if (container && container.scrollTop < 20) {
      setCountdown(3);
      if (soundEnabled) playBeep(520, 0.15);

      let currentCount = 3;
      const interval = setInterval(() => {
        currentCount -= 1;
        if (currentCount > 0) {
          setCountdown(currentCount);
          if (soundEnabled) playBeep(520, 0.15);
        } else {
          clearInterval(interval);
          setCountdown(0);
          if (soundEnabled) playBeep(880, 0.3, 'triangle');
          setIsPlaying(true);
        }
      }, 950);
    } else {
      setIsPlaying(true);
    }
  };

  const handleResetTeleprompter = () => {
    setIsPlaying(false);
    setCountdown(0);
    setElapsedTime(0);
    if (prompterScrollRef.current) {
      prompterScrollRef.current.scrollTop = 0;
    }
  };

  useEffect(() => {
    if (!isPlaying) {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      lastScrollTimeRef.current = null;
      return;
    }

    const step = (timestamp) => {
      if (!lastScrollTimeRef.current) lastScrollTimeRef.current = timestamp;
      const delta = timestamp - lastScrollTimeRef.current;
      lastScrollTimeRef.current = timestamp;

      const container = prompterScrollRef.current;
      if (container) {
        const pixelsPerSecond = scrollSpeed * 14;
        container.scrollTop += (pixelsPerSecond * delta) / 1000;

        if (container.scrollTop + container.clientHeight >= container.scrollHeight - 5) {
          setIsPlaying(false);
          if (soundEnabled) playBeep(440, 0.25);
          return;
        }
      }
      animFrameRef.current = requestAnimationFrame(step);
    };

    animFrameRef.current = requestAnimationFrame(step);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isPlaying, scrollSpeed, soundEnabled]);

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setElapsedTime(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [isPlaying]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (activeTab !== 'teleprompter') return;
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) return;

      if (e.code === 'Space') {
        e.preventDefault();
        handleStartTeleprompter();
      } else if (e.code === 'ArrowUp') {
        e.preventDefault();
        setScrollSpeed(s => Math.min(10, +(s + 0.5).toFixed(1)));
      } else if (e.code === 'ArrowDown') {
        e.preventDefault();
        setScrollSpeed(s => Math.max(1, +(s - 0.5).toFixed(1)));
      } else if (e.code === 'KeyR') {
        e.preventDefault();
        handleResetTeleprompter();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeTab, isPlaying, countdown]);

  const formatTime = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
      {/* TOAST NOTIFICATION */}
      {notification && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl shadow-2xl border backdrop-blur-md animate-bounce bg-slate-900/95 border-amber-500/50 text-amber-300">
          <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
          <span className="text-sm font-medium">{notification.msg}</span>
        </div>
      )}

      {/* HEADER BAR STUDIO */}
      <header className="sticky top-0 z-30 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 px-4 lg:px-8 py-3">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 via-orange-500 to-purple-600 flex items-center justify-center shadow-lg shadow-amber-500/20">
              <Film className="w-5 h-5 text-slate-950 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-extrabold tracking-tight bg-gradient-to-r from-amber-300 via-amber-400 to-purple-400 bg-clip-text text-transparent">
                  ONESHOT STUDIO AI
                </h1>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/30">
                  Văn Nói Tự Nhiên
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                Kịch bản chia sẻ thật như đời thường & Máy nhắc chữ One-Shot
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex items-center bg-slate-900 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveTab('workspace')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'workspace'
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Wand2 className="w-4 h-4" />
              <span>Soạn Kịch Bản</span>
            </button>

            <button
              onClick={() => setActiveTab('teleprompter')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'teleprompter'
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Video className="w-4 h-4" />
              <span>Phòng Quay Teleprompter</span>
              <span className="hidden md:inline-block w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            </button>

            <button
              onClick={() => setActiveTab('library')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'library'
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <FolderOpen className="w-4 h-4" />
              <span>Mẫu Chia Sẻ Thật ({savedScripts.length})</span>
            </button>
          </nav>

          {/* Real-time Quick Stats Pill */}
          <div className="hidden xl:flex items-center gap-4 bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-xl text-xs">
            <div className="flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-slate-400">Xưng hô:</span>
              <span className="font-bold text-emerald-300 capitalize">
                {selfPronoun || '...'} - {audiencePronoun || '...'}
              </span>
            </div>
            <div className="h-3 w-px bg-slate-800" />
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-slate-400">Thời lượng:</span>
              <span className={`font-bold ${metrics.readingSeconds > targetDuration * 1.2 ? 'text-rose-400' : 'text-amber-300'}`}>
                ~{metrics.readingSeconds}s / {targetDuration}s
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* ========================================== */}
      {/* TAB 1: WORKSPACE (AI GENERATOR + EDITOR)   */}
      {/* ========================================== */}
      {activeTab === 'workspace' && (
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 lg:px-8 py-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* CỘT TRÁI (4/12): BẢNG ĐIỀU KHIỂN AI & TÙY CHỈNH XƯNG HÔ */}
          <div className="lg:col-span-4 space-y-5">
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl relative overflow-hidden">
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-amber-400" />
                  <h2 className="font-bold text-base text-white">Thiết Lập Lời Thoại Đời Thường</h2>
                </div>
                <span className="text-[11px] text-emerald-300 bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 rounded-md font-medium">
                  Real-User Tone
                </span>
              </div>

              <div className="space-y-4">
                {/* KHỐI TÙY CHỈNH CHỦ NGỮ XƯNG HÔ (CUSTOM PRONOUN INPUTS) */}
                <div className="bg-slate-950/90 p-3.5 rounded-xl border border-amber-500/30 space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5" />
                      <span>Tùy chỉnh Xưng - Hô</span>
                    </label>
                    <button
                      type="button"
                      onClick={() => handleApplyPronounsToCurrentScript(selfPronoun, audiencePronoun)}
                      className="flex items-center gap-1 text-[11px] font-semibold px-2 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 transition-all"
                      title="Đổi toàn bộ xưng hô trong kịch bản đang mở sang cặp từ này"
                    >
                      <Repeat className="w-3 h-3" />
                      <span>Đổi ngay vào kịch bản</span>
                    </button>
                  </div>

                  {/* 2 Ô nhập tùy chỉnh tự do */}
                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <span className="block text-[11px] text-slate-400 mb-1">
                        Bạn tự xưng là:
                      </span>
                      <input
                        type="text"
                        value={selfPronoun}
                        onChange={(e) => setSelfPronoun(e.target.value)}
                        placeholder="VD: mình, em, tôi..."
                        className="w-full bg-slate-900 border border-slate-700 focus:border-amber-500 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-white placeholder-slate-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <span className="block text-[11px] text-slate-400 mb-1">
                        Gọi người xem là:
                      </span>
                      <input
                        type="text"
                        value={audiencePronoun}
                        onChange={(e) => setAudiencePronoun(e.target.value)}
                        placeholder="VD: các bạn, anh chị..."
                        className="w-full bg-slate-900 border border-slate-700 focus:border-amber-500 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-white placeholder-slate-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Các nút chọn nhanh cặp xưng hô */}
                  <div>
                    <span className="block text-[10px] text-slate-500 mb-1.5">
                      Hoặc chọn nhanh cặp xưng hô (bấm để áp dụng):
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {PRONOUN_PRESETS.map((preset, idx) => {
                        const isSelected =
                          selfPronoun.toLowerCase() === preset.self.toLowerCase() &&
                          audiencePronoun.toLowerCase() === preset.audience.toLowerCase();
                        return (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => {
                              setSelfPronoun(preset.self);
                              setAudiencePronoun(preset.audience);
                              handleApplyPronounsToCurrentScript(preset.self, preset.audience);
                            }}
                            className={`px-2 py-1 rounded-md text-[11px] font-medium border transition-all ${
                              isSelected
                                ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold'
                                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                            }`}
                          >
                            {preset.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Chủ đề / Trải nghiệm thực tế */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                    Câu chuyện / Trải nghiệm bạn muốn chia sẻ
                  </label>
                  <textarea
                    rows={3}
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="VD: Trải nghiệm thật của mình sau 2 tuần dùng thử máy đọc sách trước khi đi ngủ thay cho điện thoại..."
                    className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500/70 rounded-xl p-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none transition-colors resize-none"
                  />
                </div>

                {/* Phong cách nói đời thường */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                    Giọng điệu chia sẻ (Văn nói tự nhiên)
                  </label>
                  <div className="grid grid-cols-1 gap-1.5">
                    {STYLES.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setStyle(s)}
                        className={`text-left px-3 py-2 rounded-xl text-xs font-medium border transition-all flex items-center justify-between ${
                          style === s
                            ? 'bg-amber-500/15 border-amber-500/60 text-amber-300 font-semibold'
                            : 'bg-slate-950/60 border-slate-800/80 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                        }`}
                      >
                        <span>{s}</span>
                        {style === s && <Check className="w-3.5 h-3.5 text-amber-400" />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Thời lượng mục tiêu */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                    Thời lượng mục tiêu
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {DURATIONS.map((d) => (
                      <button
                        key={d.value}
                        type="button"
                        onClick={() => setTargetDuration(d.value)}
                        className={`py-2 px-2 rounded-xl text-xs font-semibold border text-center transition-all ${
                          targetDuration === d.value
                            ? 'bg-purple-500/20 border-purple-500 text-purple-300 shadow-sm'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        {d.value}s
                      </button>
                    ))}
                  </div>
                </div>

                {/* Thanh trượt tốc độ nói (WPM) */}
                <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800/80">
                  <div className="flex justify-between items-center text-xs mb-2">
                    <span className="text-slate-400 font-medium">Tốc độ nói tự nhiên của bạn:</span>
                    <span className="font-bold text-amber-400">{wpm} từ/phút (WPM)</span>
                  </div>
                  <input
                    type="range"
                    min={110}
                    max={180}
                    step={5}
                    value={wpm}
                    onChange={(e) => setWpm(Number(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                    <span>110 (Tâm sự trầm)</span>
                    <span>140 (Trò chuyện)</span>
                    <span>180 (Sôi nổi)</span>
                  </div>
                </div>

                {aiError && (
                  <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-xs text-rose-300">
                    {aiError}
                  </div>
                )}

                {/* Nút Tạo kịch bản mới với AI */}
                <button
                  onClick={handleGenerateScript}
                  disabled={isGenerating || isOptimizing}
                  className="w-full py-3 px-4 rounded-xl font-bold text-sm bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 text-slate-950 shadow-lg shadow-amber-500/20 hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Đang Viết Lời Thoại Đời Thường...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 fill-slate-950" />
                      <span>Tạo Kịch Bản Chia Sẻ Thật ({selfPronoun} - {audiencePronoun})</span>
                    </>
                  )}
                </button>

                {/* Nhóm nút AI Tinh chỉnh kịch bản đang có */}
                <div className="pt-2 border-t border-slate-800/80 space-y-2">
                  <p className="text-[11px] text-slate-400 font-medium">
                    Tinh chỉnh kịch bản đang mở bên phải bằng AI:
                  </p>
                  <button
                    onClick={() => handleOptimizeCurrentScript('natural_spoken')}
                    disabled={isGenerating || isOptimizing}
                    className="w-full py-2.5 px-3 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/40 text-xs text-emerald-300 font-bold flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Chuyển Sang Văn Nói Đời Thường ({selfPronoun} - {audiencePronoun})</span>
                  </button>

                  <div className="grid grid-cols-3 gap-1.5">
                    <button
                      onClick={() => handleOptimizeCurrentScript('breath_and_flow')}
                      disabled={isGenerating || isOptimizing}
                      className="px-2 py-2 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 text-[11px] text-cyan-300 font-medium flex flex-col items-center gap-1 transition-colors disabled:opacity-50"
                      title="Tự động thêm nhịp thở và làm câu ngắn dễ nói"
                    >
                      <Wind className="w-3.5 h-3.5" />
                      <span>Thêm Nhịp Thở</span>
                    </button>
                    <button
                      onClick={() => handleOptimizeCurrentScript('punchy_hook')}
                      disabled={isGenerating || isOptimizing}
                      className="px-2 py-2 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 text-[11px] text-amber-300 font-medium flex flex-col items-center gap-1 transition-colors disabled:opacity-50"
                      title="Làm câu mở đầu 3s đầu gần gũi, chạm đúng tâm lý hơn"
                    >
                      <Flame className="w-3.5 h-3.5" />
                      <span>Mở Đầu Thật Hơn</span>
                    </button>
                    <button
                      onClick={() => handleOptimizeCurrentScript('shorten')}
                      disabled={isGenerating || isOptimizing}
                      className="px-2 py-2 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 text-[11px] text-purple-300 font-medium flex flex-col items-center gap-1 transition-colors disabled:opacity-50"
                      title="Cô đọng lại cho vừa thời lượng mục tiêu"
                    >
                      <Zap className="w-3.5 h-3.5" />
                      <span>Cô Đọng Lại</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* BẢNG PHÂN TÍCH ĐỘ KHẢ THI ONE-SHOT (BREATH & PACING METER) */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <Mic className="w-4 h-4 text-amber-400" />
                <span>Đo Lường Hơi Thở & Nhịp Độ One-Shot</span>
              </h3>

              <div className="grid grid-cols-3 gap-2.5 text-center">
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/80">
                  <div className="text-lg font-extrabold text-white">{metrics.wordCount}</div>
                  <div className="text-[11px] text-slate-400">Từ thoại đọc</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">Chuẩn: ~{metrics.targetWords}</div>
                </div>
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/80">
                  <div className={`text-lg font-extrabold ${metrics.readingSeconds > targetDuration * 1.2 ? 'text-rose-400' : 'text-amber-400'}`}>
                    {metrics.readingSeconds}s
                  </div>
                  <div className="text-[11px] text-slate-400">Thời gian đọc</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">Mục tiêu: {targetDuration}s</div>
                </div>
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/80">
                  <div className="text-lg font-extrabold text-cyan-400">{metrics.breathCount}</div>
                  <div className="text-[11px] text-slate-400">Điểm lấy hơi</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">{metrics.stageCount} chỉ dẫn</div>
                </div>
              </div>

              {metrics.isOutOfBreathRisk ? (
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/40 flex items-start gap-2.5">
                  <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div className="text-xs text-amber-200/90 leading-relaxed">
                    <span className="font-bold text-amber-300">Lưu ý nhịp thở khi quay 1 cú máy: </span>
                    Có câu đang hơi dài hoặc tổng thời lượng ({metrics.readingSeconds}s) vượt mục tiêu ({targetDuration}s). Hãy chèn thêm <code className="text-cyan-300">[Nhịp thở 🫁]</code> để nói tự nhiên không bị gấp!
                  </div>
                </div>
              ) : (
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="text-xs text-emerald-300">
                    Nhịp câu và điểm lấy hơi rất vừa vặn để trò chuyện 1 cú máy tự nhiên!
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* CỘT PHẢI (8/12): TRÌNH SOẠN THẢO KỊCH BẢN ONE-SHOT THÔNG MINH */}
          <div className="lg:col-span-8 flex flex-col gap-5">
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col gap-4">
              {/* Tiêu đề kịch bản & Các nút Thao tác */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
                <div className="flex-1 min-w-[220px]">
                  <input
                    type="text"
                    value={scriptTitle}
                    onChange={(e) => setScriptTitle(e.target.value)}
                    placeholder="Nhập tiêu đề kịch bản chia sẻ..."
                    className="w-full bg-transparent text-lg font-bold text-white focus:outline-none focus:border-b focus:border-amber-500 pb-0.5"
                  />
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <button
                    onClick={handleSaveScript}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition-colors"
                  >
                    <Save className="w-3.5 h-3.5 text-amber-400" />
                    <span>Lưu Kịch Bản</span>
                  </button>
                  <button
                    onClick={handleCopyScript}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition-colors"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
                    <span>{copied ? 'Đã chép' : 'Sao chép'}</span>
                  </button>
                  <button
                    onClick={handleDownloadTxt}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5 text-slate-400" />
                    <span>Xuất .TXT</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('teleprompter')}
                    className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 text-xs font-bold shadow-md hover:brightness-110 transition-all"
                  >
                    <Video className="w-3.5 h-3.5" />
                    <span>Đưa Vào Máy Nhắc Chữ</span>
                  </button>
                </div>
              </div>

              {/* Thanh công cụ chèn nhanh (Quick Stage Direction Tags & Pronouns) */}
              <div className="bg-slate-950/90 p-3 rounded-xl border border-slate-800/90">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-amber-400" />
                    Chèn nhanh vào vị trí con trỏ (Đang chọn ô: <strong className="text-amber-400 uppercase">{activeSection}</strong>)
                  </span>
                  <span className="text-[11px] text-slate-500 hidden sm:inline">
                    Mẹo: Bôi đen chữ rồi bấm [Nhấn giọng 🔥]
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {QUICK_TAGS.map((item, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => insertQuickTag(item.tag)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-medium border hover:scale-105 active:scale-95 transition-all ${item.color}`}
                    >
                      + {item.label}
                    </button>
                  ))}
                  {/* Nút chèn nhanh từ xưng hô đang cài đặt */}
                  {selfPronoun && (
                    <button
                      type="button"
                      onClick={() => insertQuickTag(selfPronoun)}
                      className="px-2.5 py-1 rounded-lg text-xs font-semibold border bg-slate-800 text-amber-300 border-slate-700 hover:scale-105 transition-all"
                    >
                      + "{selfPronoun}"
                    </button>
                  )}
                  {audiencePronoun && (
                    <button
                      type="button"
                      onClick={() => insertQuickTag(audiencePronoun)}
                      className="px-2.5 py-1 rounded-lg text-xs font-semibold border bg-slate-800 text-emerald-300 border-slate-700 hover:scale-105 transition-all"
                    >
                      + "{audiencePronoun}"
                    </button>
                  )}
                </div>
              </div>

              {/* 3 PHÂN ĐOẠN CẤU TRÚC CHUẨN ONE-SHOT: HOOK -> BODY -> CTA */}
              <div className="space-y-4">
                {/* 1. HOOK (3-5s đầu) */}
                <div
                  className={`p-3.5 rounded-xl border transition-all ${
                    activeSection === 'hook'
                      ? 'bg-slate-950 border-amber-500/60 shadow-inner'
                      : 'bg-slate-950/60 border-slate-800/80'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                        1. MỞ ĐẦU TỰ NHIÊN - HOOK (3 - 5 GIÂY ĐẦU)
                      </span>
                      <span className="text-xs text-slate-400">
                        Mở lời gần gũi như đang bắt chuyện trực tiếp với {audiencePronoun}
                      </span>
                    </div>
                  </div>
                  <textarea
                    ref={hookRef}
                    rows={2}
                    value={hookText}
                    onFocus={() => setActiveSection('hook')}
                    onChange={(e) => setHookText(e.target.value)}
                    placeholder={`[Nhìn thẳng ống kính 👀] Nói thật với ${audiencePronoun} chứ đợt trước ${selfPronoun} cũng từng...`}
                    className="w-full bg-transparent text-sm text-slate-100 placeholder-slate-600 focus:outline-none resize-y leading-relaxed"
                  />
                </div>

                {/* 2. BODY (Nội dung chia sẻ thật) */}
                <div
                  className={`p-3.5 rounded-xl border transition-all ${
                    activeSection === 'body'
                      ? 'bg-slate-950 border-amber-500/60 shadow-inner'
                      : 'bg-slate-950/60 border-slate-800/80'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                        2. TRẢI NGHIỆM THỰC TẾ (BODY)
                      </span>
                      <span className="text-xs text-slate-400">
                        Kể cảm nhận thật của {selfPronoun}, ngắt câu ngắn kèm [Nhịp thở 🫁]
                      </span>
                    </div>
                  </div>
                  <textarea
                    ref={bodyRef}
                    rows={6}
                    value={bodyText}
                    onFocus={() => setActiveSection('body')}
                    onChange={(e) => setBodyText(e.target.value)}
                    placeholder={`Chia sẻ trải nghiệm thực tế của ${selfPronoun} với ${audiencePronoun} kèm theo các thẻ [Nhịp thở 🫁]...`}
                    className="w-full bg-transparent text-sm text-slate-100 placeholder-slate-600 focus:outline-none resize-y leading-relaxed"
                  />
                </div>

                {/* 3. CTA (Lời nhắn cuối gần gũi) */}
                <div
                  className={`p-3.5 rounded-xl border transition-all ${
                    activeSection === 'cta'
                      ? 'bg-slate-950 border-amber-500/60 shadow-inner'
                      : 'bg-slate-950/60 border-slate-800/80'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        3. LỜI NHẮN CUỐI / GỢI Ý (CTA)
                      </span>
                      <span className="text-xs text-slate-400">
                        Khép lại tự nhiên, rủ {audiencePronoun} cùng thử hoặc chia sẻ thêm
                      </span>
                    </div>
                  </div>
                  <textarea
                    ref={ctaRef}
                    rows={2}
                    value={ctaText}
                    onFocus={() => setActiveSection('cta')}
                    onChange={(e) => setCtaText(e.target.value)}
                    placeholder={`[Cười tự nhiên 😊] ${audiencePronoun} nào cũng gặp tình trạng giống ${selfPronoun} thì thử áp dụng xem sao nhé...`}
                    className="w-full bg-transparent text-sm text-slate-100 placeholder-slate-600 focus:outline-none resize-y leading-relaxed"
                  />
                </div>
              </div>
            </div>

            {/* BẢN XEM TRƯỚC TRỰC QUAN (LIVE VISUAL SCRIPT PREVIEW) */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                  <Eye className="w-4 h-4 text-purple-400" />
                  <span>Bản Xem Trước Phân Tách Màu (Xưng hô: {selfPronoun} - {audiencePronoun})</span>
                </h3>
                <div className="flex items-center gap-3 text-[11px]">
                  <span className="flex items-center gap-1 text-cyan-300">
                    <span className="w-2 h-2 rounded-full bg-cyan-400" /> Nhịp thở
                  </span>
                  <span className="flex items-center gap-1 text-purple-300">
                    <span className="w-2 h-2 rounded-full bg-purple-400" /> Cử chỉ/Góc máy
                  </span>
                  <span className="flex items-center gap-1 text-amber-400 font-bold">
                    <span className="w-2 h-2 rounded-full bg-amber-400" /> Nhấn giọng
                  </span>
                </div>
              </div>

              <div className="bg-slate-950 rounded-xl p-4 border border-slate-800/80 space-y-3 text-sm leading-7 text-slate-200">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400 block mb-0.5">
                    [Mở lời - Hook]
                  </span>
                  <FormattedScriptText text={hookText} />
                </div>
                <div className="border-t border-slate-900 pt-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block mb-0.5">
                    [Chia sẻ thật - Body]
                  </span>
                  <FormattedScriptText text={bodyText} />
                </div>
                <div className="border-t border-slate-900 pt-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block mb-0.5">
                    [Lời nhắn cuối - CTA]
                  </span>
                  <FormattedScriptText text={ctaText} />
                </div>
              </div>
            </div>
          </div>
        </main>
      )}

      {/* ========================================== */}
      {/* TAB 2: PHÒNG QUAY TELEPROMPTER STUDIO      */}
      {/* ========================================== */}
      {activeTab === 'teleprompter' && (
        <main className="flex-1 flex flex-col max-w-7xl w-full mx-auto px-4 lg:px-8 py-4 gap-4">
          {/* THANH ĐIỀU KHIỂN TELEPROMPTER TRÊN CÙNG */}
          <div className="bg-slate-900/95 border border-slate-800 rounded-2xl p-3.5 shadow-xl flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2.5 flex-wrap">
              <button
                onClick={handleStartTeleprompter}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all shadow-lg ${
                  isPlaying
                    ? 'bg-rose-500 text-white hover:bg-rose-600 shadow-rose-500/20'
                    : 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 hover:brightness-110 shadow-amber-500/20'
                }`}
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-4 h-4 fill-current" />
                    <span>Tạm Dừng (Space)</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-current" />
                    <span>Bắt Đầu Quay (Space)</span>
                  </>
                )}
              </button>

              <button
                onClick={handleResetTeleprompter}
                className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition-colors"
                title="Cuộn về đầu kịch bản (Phím R)"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Về đầu</span>
              </button>

              <button
                onClick={toggleCamera}
                className={`flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold border transition-all ${
                  cameraEnabled
                    ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300'
                    : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {cameraEnabled ? <Camera className="w-4 h-4" /> : <CameraOff className="w-4 h-4" />}
                <span>{cameraEnabled ? 'Tắt Camera' : 'Bật Camera Preview'}</span>
              </button>

              {cameraEnabled && (
                <button
                  onClick={() => setMirrorCam(!mirrorCam)}
                  className={`p-2.5 rounded-xl border text-xs transition-all ${
                    mirrorCam
                      ? 'bg-amber-500/20 border-amber-500/50 text-amber-300'
                      : 'bg-slate-800 border-slate-700 text-slate-400'
                  }`}
                  title="Lật gương Camera"
                >
                  <FlipHorizontal className="w-4 h-4" />
                </button>
              )}

              <button
                onClick={() => setMirrorText(!mirrorText)}
                className={`flex items-center gap-1.5 px-3 py-2.5 rounded-xl border text-xs font-medium transition-all ${
                  mirrorText
                    ? 'bg-purple-500/20 border-purple-500/50 text-purple-300'
                    : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-slate-200'
                }`}
                title="Lật ngược chữ cho thiết bị kính quang học Teleprompter"
              >
                <FlipVertical className="w-4 h-4" />
                <span className="hidden sm:inline">Lật chữ (Kính)</span>
              </button>

              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className="p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 hover:text-white"
                title="Bật/Tắt tiếng Bíp đếm ngược"
              >
                {soundEnabled ? <Volume2 className="w-4 h-4 text-amber-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
              </button>
            </div>

            {/* Nhóm Thanh trượt Tốc độ cuộn, Cỡ chữ, Độ mờ nền */}
            <div className="flex flex-wrap items-center gap-4 text-xs">
              <div className="flex items-center gap-2 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
                <span className="text-slate-400">Tốc độ cuộn:</span>
                <input
                  type="range"
                  min={1}
                  max={10}
                  step={0.5}
                  value={scrollSpeed}
                  onChange={(e) => setScrollSpeed(Number(e.target.value))}
                  className="w-20 accent-amber-500 cursor-pointer"
                />
                <span className="font-bold text-amber-400 w-6 text-right">{scrollSpeed}x</span>
              </div>

              <div className="flex items-center gap-2 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
                <Type className="w-3.5 h-3.5 text-slate-400" />
                <input
                  type="range"
                  min={22}
                  max={60}
                  step={2}
                  value={fontSize}
                  onChange={(e) => setFontSize(Number(e.target.value))}
                  className="w-20 accent-amber-500 cursor-pointer"
                />
                <span className="font-bold text-slate-200 w-9 text-right">{fontSize}px</span>
              </div>

              <div className="flex items-center gap-2 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
                <span className="text-slate-400">Nền tối:</span>
                <input
                  type="range"
                  min={20}
                  max={95}
                  step={5}
                  value={overlayOpacity}
                  onChange={(e) => setOverlayOpacity(Number(e.target.value))}
                  className="w-16 accent-amber-500 cursor-pointer"
                />
                <span className="font-bold text-slate-200 w-8 text-right">{overlayOpacity}%</span>
              </div>
            </div>
          </div>

          {cameraError && (
            <div className="px-4 py-2.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-xs text-amber-300 flex items-center justify-between">
              <span>{cameraError}</span>
              <button onClick={() => setCameraError('')} className="underline ml-4">Đóng</button>
            </div>
          )}

          {/* KHUNG MÀN HÌNH TELEPROMPTER & CAMERA TRỰC TIẾP */}
          <div className="relative flex-1 min-h-[540px] h-[72vh] rounded-3xl overflow-hidden border-2 border-slate-800 bg-black shadow-2xl flex flex-col items-center justify-center">
            {cameraEnabled && (
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className={`absolute inset-0 w-full h-full object-cover ${
                  mirrorCam ? 'scale-x-[-1]' : ''
                }`}
              />
            )}

            <div
              className="absolute inset-0 transition-opacity duration-200 pointer-events-none"
              style={{
                backgroundColor: `rgba(2, 6, 23, ${cameraEnabled ? overlayOpacity / 100 : 0.96})`
              }}
            />

            {/* VẠCH CHỈ BÁO TẦM MẮT CAMERA */}
            <div className="absolute top-24 inset-x-0 z-20 pointer-events-none flex items-center justify-between px-4">
              <div className="flex items-center gap-2 bg-amber-500 text-slate-950 text-[10px] font-extrabold px-2.5 py-1 rounded-r-full shadow-lg">
                <Eye className="w-3.5 h-3.5" />
                <span>ĐỌC TẠI VẠCH NÀY ĐỂ MẮT NHÌN THẲNG ỐNG KÍNH</span>
              </div>
              <div className="flex-1 border-t-2 border-dashed border-amber-400/40 mx-3" />
              <div className="bg-slate-900/90 border border-slate-700 px-3 py-1 rounded-full text-xs font-mono flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-full ${isPlaying ? 'bg-red-500 animate-ping' : 'bg-slate-500'}`} />
                <span className="text-white font-bold">{formatTime(elapsedTime)}</span>
                <span className="text-slate-400">/ {formatTime(metrics.readingSeconds)}</span>
              </div>
            </div>

            <div className="absolute top-16 h-24 inset-x-0 bg-gradient-to-b from-amber-500/5 via-amber-500/10 to-transparent pointer-events-none z-10 border-y border-amber-500/20" />

            {/* HIỆU ỨNG ĐẾM NGƯỢC 3 - 2 - 1 */}
            {countdown > 0 && (
              <div className="absolute inset-0 z-30 bg-slate-950/80 backdrop-blur-sm flex flex-col items-center justify-center">
                <div className="w-36 h-36 rounded-full border-4 border-amber-400 flex items-center justify-center bg-slate-900/90 shadow-2xl shadow-amber-500/30 animate-pulse">
                  <span className="text-7xl font-black text-amber-400">{countdown}</span>
                </div>
                <p className="mt-4 text-lg font-bold text-white tracking-wider uppercase">
                  Thả lỏng vai, lấy hơi & Trò chuyện tự nhiên với {audiencePronoun}...
                </p>
              </div>
            )}

            {/* VÙNG CUỘN CHỮ TELEPROMPTER */}
            <div
              ref={prompterScrollRef}
              className={`relative z-10 w-full h-full overflow-y-auto scroll-smooth px-6 sm:px-12 ${
                mirrorText ? 'scale-x-[-1]' : ''
              }`}
              style={{ maxWidth: `${prompterWidth}%` }}
            >
              <div className="h-24" />

              <div
                className="font-semibold leading-relaxed tracking-wide text-slate-100 space-y-8 pb-[55vh]"
                style={{ fontSize: `${fontSize}px`, lineHeight: 1.55 }}
              >
                {hookText && (
                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                    <div className="text-xs font-bold uppercase tracking-widest text-rose-400 mb-2">
                      🔥 MỞ LỜI TỰ NHIÊN (HOOK 3-5S)
                    </div>
                    <FormattedScriptText text={hookText} isTeleprompter />
                  </div>
                )}

                {bodyText && (
                  <div className="p-4 rounded-2xl bg-white/[0.02]">
                    <div className="text-xs font-bold uppercase tracking-widest text-amber-400 mb-2">
                      📖 CHIA SẺ TRẢI NGHIỆM THẬT
                    </div>
                    <FormattedScriptText text={bodyText} isTeleprompter />
                  </div>
                )}

                {ctaText && (
                  <div className="p-4 rounded-2xl bg-emerald-500/[0.07] border border-emerald-500/20">
                    <div className="text-xs font-bold uppercase tracking-widest text-emerald-400 mb-2">
                      🎯 LỜI NHẮN CUỐI (CTA)
                    </div>
                    <FormattedScriptText text={ctaText} isTeleprompter />
                  </div>
                )}

                <div className="text-center py-8 text-base text-amber-400 font-bold uppercase tracking-widest">
                  🎬 --- KẾT THÚC CÚ MÁY ONE-SHOT (GIỮ NỤ CƯỜI TỰ NHIÊN 2 GIÂY) --- 🎬
                </div>
              </div>
            </div>

            <div className="absolute bottom-0 inset-x-0 h-2 bg-slate-900 z-20">
              <div
                className="h-full bg-gradient-to-r from-amber-500 via-orange-500 to-emerald-400 transition-all duration-500"
                style={{
                  width: `${Math.min(100, (elapsedTime / Math.max(1, metrics.readingSeconds)) * 100)}%`
                }}
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between text-xs text-slate-400 px-2">
            <div className="flex items-center gap-4">
              <span>⌨️ <strong>Phím Cách (Space):</strong> Chạy / Tạm dừng</span>
              <span>⬆️⬇️ <strong>Mũi tên Lên/Xuống:</strong> Tăng/Giảm tốc độ chữ</span>
              <span>🔄 <strong>Phím R:</strong> Cuộn lại từ đầu</span>
            </div>
            <div className="flex items-center gap-2">
              <span>Độ hẹp vùng đọc (giúp mắt không liếc ngang):</span>
              <input
                type="range"
                min={45}
                max={100}
                step={5}
                value={prompterWidth}
                onChange={(e) => setPrompterWidth(Number(e.target.value))}
                className="w-24 accent-amber-500 cursor-pointer"
              />
              <span className="text-amber-400 font-bold">{prompterWidth}%</span>
            </div>
          </div>
        </main>
      )}

      {/* ========================================== */}
      {/* TAB 3: KỊCH BẢN MẪU & THƯ VIỆN ĐÃ LƯU      */}
      {/* ========================================== */}
      {activeTab === 'library' && (
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 lg:px-8 py-6 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Bookmark className="w-5 h-5 text-amber-400" />
                <span>Kho Kịch Bản Chia Sẻ Thật & Đã Lưu</span>
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Các mẫu được viết theo văn nói đời thường tự nhiên, có sẵn các kiểu xưng hô đa dạng
              </p>
            </div>

            <button
              onClick={() => {
                setSavedScripts(SAMPLE_SCRIPTS);
                showToast('Đã khôi phục các kịch bản mẫu đời thường!');
              }}
              className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-slate-300 transition-colors"
            >
              Khôi phục mẫu gốc
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {savedScripts.map((item) => (
              <div
                key={item.id}
                className="bg-slate-900/90 border border-slate-800 hover:border-amber-500/50 rounded-2xl p-5 flex flex-col justify-between gap-4 transition-all group shadow-lg"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                        <span className="inline-block text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-amber-500/15 text-amber-300 border border-amber-500/30">
                          {item.style} • {item.targetDuration}s
                        </span>
                        {item.selfPronoun && item.audiencePronoun && (
                          <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 capitalize">
                            Xưng hô: {item.selfPronoun} - {item.audiencePronoun}
                          </span>
                        )}
                      </div>
                      <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                        {item.title}
                      </h3>
                    </div>
                    <span className="text-[11px] text-slate-500 shrink-0">{item.createdAt}</span>
                  </div>

                  <div className="bg-slate-950/90 rounded-xl p-3.5 border border-slate-800/80 space-y-2 text-xs text-slate-300 leading-relaxed line-clamp-5">
                    <div>
                      <strong className="text-rose-400">Hook: </strong>
                      <FormattedScriptText text={item.hook} />
                    </div>
                    <div>
                      <strong className="text-amber-400">Body: </strong>
                      <FormattedScriptText text={item.body} />
                    </div>
                    <div>
                      <strong className="text-emerald-400">CTA: </strong>
                      <FormattedScriptText text={item.cta} />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleLoadScript(item)}
                      className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors flex items-center gap-1.5"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>Mở Chỉnh Sửa</span>
                    </button>
                    <button
                      onClick={() => {
                        handleLoadScript(item);
                        setActiveTab('teleprompter');
                      }}
                      className="px-3.5 py-2 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-500/40 font-semibold text-xs transition-colors flex items-center gap-1.5"
                    >
                      <Video className="w-3.5 h-3.5" />
                      <span>Quay Ngay</span>
                    </button>
                  </div>

                  <button
                    onClick={() => handleDeleteScript(item.id)}
                    className="p-2 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                    title="Xóa kịch bản này"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      )}
    </div>
  );
}