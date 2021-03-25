pipeline {
  agent any
  environment {
    CRYPTOMEDIC_UPLOAD = credentials('cryptomedic-upload')
    CRYPTOMEDIC_DB_UPGRADE = credentials('cryptomedic-deploy')

    // Need a different port, to allow continue working in dev with normal port
    CRYPTOMEDIC_PORT = "15080"

    // To have the same docker-compose to all, to allow killing previous one
    //   See https://docs.docker.com/compose/reference/envvars/#compose_project_name
    COMPOSE_PROJECT_NAME = "jenkins_cryptomedic"
    VERBOSE = "targets"
  }
  options {
    ansiColor('xterm')
    lock resource: 'port_${CRYPTOMEDIC_PORT}'
    skipStagesAfterUnstable()
    disableConcurrentBuilds()
    timeout(time: 15, unit: 'MINUTES')
  }
  stages {
    stage('setup-computer') {
      steps {
        sh 'make setup-computer'
      }
    }
    stage('stop previous') {
      steps {
        sh 'make stop'
        sh 'nc -v -w 1 localhost ${CRYPTOMEDIC_PORT} || true'
      }
    }
    stage('dump') {
      steps {
        sh 'make dump'
      }
    }
    stage('start') {
      steps {
        sh 'make start'
      }
    }
    stage('dependencies') {
      steps {
        sh '''
npm ci
touch node_modules/.dependencies
make dependencies
'''
      }
    }
    stage('build') {
      steps {
        sh 'make build'
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
    stage('test-styles') {
      steps {
        sh 'make test-styles'
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
          sh '''
            CRYPTOMEDIC_UPLOAD_USER=$CRYPTOMEDIC_UPLOAD_USR \
              CRYPTOMEDIC_UPLOAD_PASSWORD=$CRYPTOMEDIC_UPLOAD_PSW \
              make deploy
          '''
        }
      }
    }
  }
  post {
    always {
      sh 'make chmod || true'
      sh 'make stop'
      junit 'tmp/js/junit/*.xml'
      junit 'tmp/phpv*/index*.xml'
      // deleteDir() /* clean up our workspace */
    }
  }
}