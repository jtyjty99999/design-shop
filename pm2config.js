module.exports = {
    apps : [
        {
          name: "myapp",
          script: "./index.js",
          watch: true,
          env: {
            "UPYUN_BUCKET": "pic-cloud-hn",
            "UPYUN_PASSWORD": "jty19880604",
            "UPYUN_SECRET": "9Tiuyq6o484zVgBXPem2qNd/0hM=",
            "UPYUN_USERNAME": "jtyjty99999",
          }
        }
    ]
  }
  