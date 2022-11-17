const DownloadUtils = {
  download: (blob: Blob, fileName: string): void => {
    const link = document.createElement("a");
    const downloadUrl = window.URL.createObjectURL(blob);
    link.download = fileName;
    link.href = downloadUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  },
};

export default DownloadUtils;
