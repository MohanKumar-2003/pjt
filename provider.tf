provider "aws" {
  region = "us-east-1"
  access_key = "secrets.AWS_ACCESS_KEY_ID"
  secret_key = "secrets.AWS_SECRET_ACCESS_KEY"
}

resource "aws_instance" "example" {
  ami           = "ami-0c55b159cbfafe1f0"
  instance_type = "t2.micro"
}
