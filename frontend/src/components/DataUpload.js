import React, { useState } from 'react';

function DataUpload() {
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setError(null);
            setSuccess(false);
        }
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!file) {
            setError('Please select a file to upload');
            return;
        }

        setUploading(true);
        setError(null);
        setSuccess(false);

        try {
            // TODO: Implement actual file upload logic
            // Simulating upload delay
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            console.log('File uploaded:', file.name);
            setSuccess(true);
            setFile(null);
            // Reset file input
            e.target.reset();
        } catch (err) {
            setError('Failed to upload file. Please try again.');
            console.error('Upload error:', err);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="data-upload">
            <h2>Upload Trade Data</h2>
            
            <form onSubmit={handleUpload} className="upload-form">
                <div className="file-input-container">
                    <input
                        type="file"
                        onChange={handleFileChange}
                        accept=".csv,.xlsx,.xls"
                        id="file-upload"
                        disabled={uploading}
                    />
                    <label htmlFor="file-upload" className="file-label">
                        {file ? file.name : 'Choose file'}
                    </label>
                </div>

                {file && (
                    <div className="file-info">
                        <p>Selected file: {file.name}</p>
                        <p>Size: {(file.size / 1024).toFixed(2)} KB</p>
                    </div>
                )}

                <button 
                    type="submit" 
                    disabled={!file || uploading}
                    className="upload-button"
                >
                    {uploading ? 'Uploading...' : 'Upload'}
                </button>
            </form>

            {error && (
                <div className="upload-error">
                    {error}
                </div>
            )}

            {success && (
                <div className="upload-success">
                    File uploaded successfully!
                </div>
            )}

            <div className="upload-instructions">
                <h3>Instructions:</h3>
                <ul>
                    <li>Accepted file formats: .csv, .xlsx, .xls</li>
                    <li>Maximum file size: 10MB</li>
                    <li>Ensure your file follows the required format</li>
                    <li>First row should contain column headers</li>
                </ul>
            </div>
        </div>
    );
}

export default DataUpload;
