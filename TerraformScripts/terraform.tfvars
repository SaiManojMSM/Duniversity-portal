region = "ap-southeast-3"
vpc_cidr = "10.0.0.0/16"

public_subnet_cidrs = [
  "10.0.11.0/24",
  "10.0.12.0/24",
  "10.0.13.0/24",
  "10.0.14.0/24"
]

availability_zones = [
  "ap-southeast-3a",
  "ap-southeast-3b",
  "ap-southeast-3c"
]

destination_cidr_block = "0.0.0.0/0"

cluster_name = "univ-app-cluster"
node_desired_size = 3
node_min_size = 3
node_max_size = 5
instance_type = "t3.medium"
key_name = "Manoj-Ansible-Key"
ami_id_linux = "ami-0c3ce9247ac7f2bc7"
ami_id_ubuntu = "ami-0f60ebc551a693514"
instance_types = {
  bastion   = "t3.micro"
  jenkins   = "t3.medium"
  sonarqube = "t3.medium"
}
tags = {
  Environment = "Dev"
  Project     = "univ-app"
  Owner       = "Manoj"
}