pipeline {
  agent any
  stages {
    stage('install') {
      steps {
        sh '''set -e
npm ci
touch node_modules/.dependencies'''
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

  }
  post {
    always {
      sh 'docker-compose down'
    }
  }
}