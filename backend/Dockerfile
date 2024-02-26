# Use an official Python runtime as a parent image
FROM python:3.9-buster

# Set the working directory in the container to /app
WORKDIR /app

# Copy the current directory into the container at /app
COPY . /app

RUN pip install --upgrade pip

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Make port 80 available to the world outside this container
EXPOSE 80

# Run server.py when the container launches
CMD ["python", "server.py"]
