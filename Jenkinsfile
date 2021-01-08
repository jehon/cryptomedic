pipeline {
  agent any
  environment {
    CRYPTOMEDIC_UPLOAD_USER = credentials('CRYPTOMEDIC_UPLOAD_USER')
    CRYPTOMEDIC_UPLOAD_PASSWORD = credentials('CRYPTOMEDIC_UPLOAD_PASSWORD')
    CRYPTOMEDIC_DB_UPGRADE = credentials('CRYPTOMEDIC_DB_UPGRADE')
  }
  options {
    lock resource: 'cryptomedic_docker_compose'
  }
  stages {
    stage('dependencies') {
      steps {
        sh '''set -e
npm ci
touch node_modules/.dependencies

make dependencies'''
      }
    }

    stage('test') {
      steps {
        sh 'make test'
      }
    }

    stage('lint') {
      steps {
        sh 'make lint'
      }
    }
    stage('Deploy test') {
      steps {
        sh 'make deploy-test'
      }
    }
    stage('Deploy') {
      when {
        anyOf { branch 'master' ; branch pattern: "build/.*", comparator: "REGEXP" }
      }
      steps {
        sh 'make deploy'
      }
    }
  }
  post {
    always {
      sh 'docker-compose down'
      junit 'tmp/js/junit/TESTS.xml'
    }
  }
}