provider "aws" {
  region = "eu-north-1"
  access_key="AKIAZI2LCIQYA6PYZBMT"
  secret_key="ZajfA1B6XyZjBj1Wr1F0D5YSQfQvUXxmE9MGm/8s"

}

resource "aws_instance" "example" {
  ami           = "aami-03c3351e3ce9d04eb"
  instance_type = "t3.micro"
}
