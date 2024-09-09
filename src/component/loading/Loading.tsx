import "./loading.css";

export default function Loading() {
  return (
    <div className="loading">
      <div className="container">
        <div className="spinner"></div>
        <p className="loadingWord">Loading...</p>
      </div>
    </div>
  );
}
