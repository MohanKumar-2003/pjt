provider "aws" {
  region = "eu-north-1"
  access_key = "secrets.newa"
  secret_key = "secrets.news"
}

resource "aws_instance" "example" {
  ami           = "ami-0c55b159cbfafe1f0"
  instance_type = "t2.micro"
}
