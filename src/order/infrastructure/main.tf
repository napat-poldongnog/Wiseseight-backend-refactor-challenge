provider "aws" {

}

provider "kubernetes" {

}

terraform {
  backend "s3" {

  }
}

resource "aws_s3_object" "public_asset" {
  key    = ""
  bucket = var.s3_bucket_name
}
