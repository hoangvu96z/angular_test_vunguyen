pipeline {
    agent { label 'angular'}
    stages {
        stage('Install') {
            steps {
                sh '''
                    npm install -f
                '''
            }
        }
        stage('Build') {
            steps {
                sh '''
                    npm run build
                '''
            }
        }
    }
}