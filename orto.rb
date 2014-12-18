# coding: utf-8
require 'sinatra'

class Orto < Sinatra::Base

  get '*/css/:name.css' do
    content_type 'text/css', :charset => 'utf-8'
    scss(:"/css/#{params[:name]}")
  end

  get '/' do
    haml :index
  end

  post '/submit_feedback' do

    begin
      api_key = File.open('/etc/mailgun_passwd').read.chop

      RestClient.post api_key,
      :from => "#{params['email'].match(/^[^@]*/i).to_s} <#{params['email']}>",
      :to => "ortotech@ortotech.sk",
      :subject => "Feedback - #{params['name']}",
      :text => "Ošetrujúci lekár(ka): #{get_doctor(params['doctor'])} \n" \
                "Spokojnosť s personálom : #{get_quality(params['quality'])} \n" \
                "Text :\n#{params['feedback']}"

    rescue => e
      File.open('/tmp/kiosk.log','a+') {|f| f.write("#{e} \n\n\n")}

      RestClient.post api_key,
      :from => "#{params['email'].match(/^[^@]*/i).to_s} <#{params['email']}>",
      :to => "htmtrade2@gmail.com",
      :subject => "Ortotech - Panel exception",
      :text => "#{e} \n\n Params: #{params}"
    end

    redirect '/'
  end

  def get_doctor(index)
    case index
    when "1"
      "MUDr. Čunderlíková"
    when "2"
      "MUDr. Hudec"
    when "3"
      "MUDr. Konderová"
    when "4"
      "MUDr. Kubišová"
    end
  end

  def get_quality(index)
    case index
    when "1"
      "Nadmieru spokojný"
    when "2"
      "Spokojný"
    when "3"
      "Priemer"
    when "4"
      "Nespokojný"
    when "5"
      "Nadmieru nespokojný"
    end
  end

end

