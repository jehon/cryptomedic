pipeline {
  agent any
  environment {
    CRYPTOMEDIC_UPLOAD_USER = credentials('CRYPTOMEDIC_UPLOAD_USER')
    CRYPTOMEDIC_UPLOAD_PASSWORD = credentials('CRYPTOMEDIC_UPLOAD_PASSWORD')
    CRYPTOMEDIC_DB_UPGRADE = credentials('CRYPTOMEDIC_DB_UPGRADE')
    // Need a port for console call -> do everything from dev is ok
    CRYPTOMEDIC_PORT = 15080
  }
  options {
    ansiColor('xterm')
    lock resource: 'port_${CRYPTOMEDIC_PORT}'
    skipStagesAfterUnstable()
    disableConcurrentBuilds()
  }
  stages {
    stage('setup') {
      steps {
        sh 'make setup-computer'
      }
    }
    stage('dump') {
      steps {
        sh 'make dump'
      }
    }
    stage('dependencies') {
      steps {
        sh '''
set -e
npm ci
touch node_modules/.dependencies
make dependencies
'''
      }
    }

    stage('test-api') {
      steps {
        sh 'make test-api'
      }
    }
    stage('test-api-bare') {
      steps {
        sh 'make test-api-bare'
      }
    }
    stage('test-unit') {
      steps {
        sh 'make test-unit'
      }
    }
    stage('test-e2e') {
      steps {
        sh 'make test-e2e'
      }
    }
    stage('test-style') {
      steps {
        sh 'make test-style'
      }
    }
    stage('lint') {
      steps {
        sh 'make lint'
      }
    }

    stage('Deploy test') {
      when {
        anyOf { branch pattern: "ci/.*", comparator: "REGEXP" }
      }
      steps {
        sh 'make deploy-test'
        archiveArtifacts 'tmp/e2e/browsers/firefox/*.png'
      }
    }
    stage('Deploy') {
      // options {
      //   lock resource: 'cryptomedic_production'
      // }
      when {
        branch 'master'
      }
      steps {
        lock(resource: 'cryptomedic_production') {
          sh 'make deploy'
        }
      }
    }
  }
  post {
    always {
      sh 'make stop'
      junit 'tmp/js/junit/*.xml'
      junit 'tmp/phpv*/index*.xml'
      deleteDir() /* clean up our workspace */
    }
  }
}