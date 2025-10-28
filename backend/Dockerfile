FROM python:3.11-slim

# Install Rust first
RUN apt-get update && apt-get install -y curl && \
    curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y && \
    . $HOME/.cargo/env

ENV PATH="/root/.cargo/bin:${PATH}"

# Install system dependencies
RUN apt-get install -y \
    build-essential \
    cmake \
    pkg-config \
    libcairo2-dev \
    libpango1.0-dev \
    libpangocairo-1.0-0 \
    libgdk-pixbuf2.0-dev \
    libffi-dev \
    libgirepository1.0-dev \
    python3-dev \
    libxml2-dev \
    libxslt1-dev \
    zlib1g-dev \
    libjpeg-dev \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY requirements.txt .
RUN pip install --upgrade pip setuptools wheel && \
    pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8080

CMD ["python", "-m", "uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8080"]
