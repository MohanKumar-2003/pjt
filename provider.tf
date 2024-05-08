provider "aws" {
  region = "eu-north-1"
  access_key="AKIAZI2LCIQYA6PYZBMT"
  secret_key="ZajfA1B6XyZjBj1Wr1F0D5YSQfQvUXxmE9MGm/8s"

}

resource "aws_instance" "example" {
  ami           = "ami-0c55b159cbfafe1f0"
  instance_type = "t2.micro"
}
